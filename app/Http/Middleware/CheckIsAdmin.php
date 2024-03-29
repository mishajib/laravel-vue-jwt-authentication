<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (\Auth::user()->role === 2) {
            return $next($request);
        } else {
            if (!$request->expectsJson()) {
                return route('login');
            } else {
                return response()->json(['error' => 'Unauthorized.'], 403);
            }
        }
    }
}
