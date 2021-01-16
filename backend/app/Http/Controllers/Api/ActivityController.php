<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\activity\StoreActivityRequest;
use App\Http\Requests\activity\UpdateActivityRequest;
use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    /**
     * Get user's activities
     * @return JsonResponse
     */
    public function index() {

        return response()->json([
            "success" => true,
            "data" => Auth::user()->activities()->get()
        ]);

    }

    /**
     * Get activity
     * @param $id
     * @return JsonResponse
     */
    public function retrieve($id) {

        return response()->json([
            "success" => true,
            "data" => Auth::user()->activities()->where('id', $id)->get()
        ]);

    }

    /**
     * @param StoreActivityRequest $request
     * @return JsonResponse
     */
    public function store(StoreActivityRequest $request): JsonResponse
    {

        $validated = $request->validated();

        $activity = new Activity();

        $activity->name = $validated['name'];

        !empty($validated['description']) ? $activity->description = $validated['description'] : '';

        $activity->user_id = auth()->user()->id;

        $activity->save();

        $activity->refresh();

        return response()->json([
            "success" => true,
            "data" => $activity
        ], 201);

    }

    public function update(UpdateActivityRequest $request, $id) {


        $validated = $request->validated();

        $activity = Auth::user()->activities()->find($id);

        $activity->update($validated);

        $activity->save();

        return response()->json([
            "success" => true,
            "data" => $activity
        ]);


    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function setStatus($id): JsonResponse
    {

        $activity = Auth::user()->activities()->find($id);

        $activity->status = !$activity->status;

        $activity->save();

        return response()->json([
            "success" => true,
            "data" => $activity
        ]);

    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function delete($id): JsonResponse
    {

        $deleted = Auth::user()->activities()->find($id)->delete();

        return response()->json([
            "success" => true,
            "data" => $deleted ? 'Activity successfully deleted.' : 'Something went wrong.'
        ]);

    }
}
