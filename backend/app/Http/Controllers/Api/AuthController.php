<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\auth\LoginAuthRequest;
use App\Http\Requests\auth\RegisterAuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Validator;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

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

        $user = Auth::user();

        return response()->json([
            'success' => true,
            'data' => $this->user()

        ]);

    }


    /**
     * @return array
     */
    private function user(): array
    {
        $user = Auth::user();

        return  [
            'user' => $user,
            'activities' => $user->activities()->select(['id', 'name', 'description'])->where('status', false)->get()
        ];
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|JsonResponse|\Illuminate\Http\Response
     */
    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);

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
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken(string $token): JsonResponse
    {
        $cookie = cookie("jwt", $token,  10080);

        return response()->json([
            'message' => 'success',
            'data' => $this->user()
        ])->withCookie($cookie);
    }
}
