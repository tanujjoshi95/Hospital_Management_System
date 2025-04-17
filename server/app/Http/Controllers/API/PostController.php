<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of posts.
     */
    public function index(Request $request)
    {
        // Get query parameters for filtering, sorting, and pagination
        $perPage = $request->input('per_page', 15);
        $user_id = $request->input('user_id');
        $is_published = $request->boolean('is_published', null);
        
        // Start building the query
        $query = Post::query();
        
        // Add filters if provided
        if ($user_id) {
            $query->where('user_id', $user_id);
        }
        
        if ($is_published !== null) {
            $query->where('is_published', $is_published);
        }
        
        // Add sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $query->orderBy($sortBy, $sortDir);
        
        // Execute query with pagination
        $posts = $query->with('user')->paginate($perPage);
        
        // Return as a collection resource
        return new PostCollection($posts);
    }

    /**
     * Store a newly created post.
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        // Validation is automatically handled by the FormRequest
        
        // Create the post with validated data
        $post = Post::create($request->validated());
        
        // Load the user relationship
        $post->load('user');
        
        // Return the new post as a resource
        return (new PostResource($post))
            ->additional(['message' => 'Post created successfully'])
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post): PostResource
    {
        // Load the user relationship
        $post->load('user');
        
        // Return the post as a resource
        return new PostResource($post);
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        // Validation and authorization handled by FormRequest
        
        // Update the post with validated data
        $post->update($request->validated());
        
        // Reload the post and its user
        $post->refresh();
        $post->load('user');
        
        // Return the updated post as a resource
        return (new PostResource($post))
            ->additional(['message' => 'Post updated successfully']);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): JsonResponse
    {
        // Check if user is authorized to delete this post
        if (auth()->id() !== $post->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized action',
            ], 403);
        }
        
        // Delete the post
        $post->delete();
        
        // Return success response
        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully',
        ]);
    }
}

