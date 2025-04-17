<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        // Handle API responses for various exception types
        $this->renderable(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found',
                    'errors' => [
                        'detail' => 'The requested resource was not found on the server'
                    ]
                ], 404);
            }
        });

        $this->renderable(function (HttpException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage() ?: 'HTTP error occurred',
                    'errors' => [
                        'detail' => 'An error occurred while processing your request',
                        'status_code' => $e->getStatusCode()
                    ]
                ], $e->getStatusCode());
            }
        });

        $this->renderable(function (Throwable $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                $statusCode = 500;
                $message = 'Server Error';
                
                // Don't expose detailed error in production
                $detail = app()->environment('production')
                    ? 'An unexpected error occurred'
                    : $e->getMessage();
                
                return response()->json([
                    'success' => false,
                    'message' => $message,
                    'errors' => [
                        'detail' => $detail
                    ]
                ], $statusCode);
            }
        });
    }

    /**
     * Convert a validation exception into a JSON response.
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        return response()->json([
            'success' => false,
            'message' => $exception->getMessage(),
            'errors' => $exception->errors(),
        ], $exception->status);
    }

    /**
     * Convert an authentication exception into a response.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
                'errors' => [
                    'detail' => 'You must be logged in to access this resource'
                ]
            ], 401);
        }

        return redirect()->guest(route('login'));
    }
}

