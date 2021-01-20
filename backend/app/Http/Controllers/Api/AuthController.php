<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\auth\LoginAuthRequest;
use App\Http\Requests\auth\RegisterAuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Validator;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginAuthRequest $request
     * @return JsonResponse
     */
    public function login(LoginAuthRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized, wrong credentials.'], 401);
        }



        return $this->respondWithToken($token);
    }

    /**
     * Register a User.
     *
     * @param RegisterAuthRequest $request
     * @return JsonResponse
     */
    public function register(RegisterAuthRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create(array_merge(
            $validated,
            ['password' => bcrypt($validated['password'])]
        ));

        return response()->json([
            'success' => true,
            'message' => 'User successfully registered',
            'data' => $user
        ], 201);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
//        return response()->json([
//            'user' =>Auth::user()->with('activities')->get()]);

        return response()->json(Auth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            //'user' => $this->me()->getOriginalContent()['user'],
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
