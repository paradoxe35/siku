<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Http\Resources\Agent\Agent as AgentResource;
use App\Http\Resources\Agent\AgentCollection;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AgentsController extends Controller
{

    public function __construct()
    {
        $this->middleware('optimizeImages:60')->only('store');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return Agent::query();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new AgentCollection($this->query()->latest()->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:agents'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:agents'],
            'phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/', 'unique:agents'],
            'role' => ['required', 'string'],
            'image' => File::IMAGE_RULES,
            'status' => ['required'],
        ]);

        $agent = $this->query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => $request->role,
            'status' => !!$request->status,
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->storePublicly(File::AGENTS_IMG_PATH . "/{$agent->id}");
            $agent->image = $path;
            $agent->save();
        }

        $agent->refresh();

        return [
            'message' => trans("L'agent a été enregistré avec succès"),
            'item' => (new AgentResource($agent))->toArray($request)
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $agent = $this->query()->findOrFail($id);

        switch (request('status')) {
            case 'online':
                $agent->status = true;
                break;
            case 'offline':
                $agent->status = false;
                break;
            default:
                break;
        }

        $agent->save();

        $agent->refresh();

        return new AgentResource($agent);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $agent = $this->query()->findOrFail($id);

        $agent->delete();

        Storage::delete($agent->image);

        return new AgentResource($agent);
    }
}
