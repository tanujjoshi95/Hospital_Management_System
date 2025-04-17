<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SimplePost;
use Illuminate\Http\Request;

class SimplePostController extends Controller
{
    /**
     * Get all posts
     */
    public function index()
    {
        $posts = SimplePost::all();
        return response()->json($posts);
    }
    
    /**
     * Create a new post
     */
    public function store(Request $request)
    {
        // Basic validation directly in controller
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        
        // Add user_id to the data
        $validated['user_id'] = auth()->id();
        
        // Create and save post
        $post = SimplePost::create($validated);
        
        // Return the post with 201 Created status code
        return response()->json($post, 201);
    }
    
    /**
     * Get a specific post
     */
    public function show($id)
    {
        $post = SimplePost::findOrFail($id);
        return response()->json($post);
    }
    
    /**
     * Update a post
     */
    public function update(Request $request, $id)
    {
        // Find post
        $post = SimplePost::findOrFail($id);
        
        // Basic validation directly in controller
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);
        
        // Update post
        $post->update($validated);
        
        // Return the updated post
        return response()->json($post);
    }
    
    /**
     * Delete a post
     */
    public function destroy($id)
    {
        $post = SimplePost::findOrFail($id);
        $post->delete();
        
        return response()->json(['message' => 'Post deleted']);
    }
}

