<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagsRequest;
use App\Http\Resources\TagsResource;
use App\Models\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller {

    protected $paginate = 10;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $tag = Tags::find($request->id);
            if (!$tag->exists()) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Tag não encontrada"
            ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "tag" => TagsResource::make($tag)
            ]);
        }

        $tag = Tags::where("name", "ilike", $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
        return response()->json([
            "status" => true,
            "severity" => "success",
            "tags" => TagsResource::collection($tag),
            "pagination" => [
                "last_page" => $tag->lastPage(),
                "current" => $tag->currentPage()
            ]
        ]);
    }

    //POST

    public function Create(TagsRequest $request) {
        $data = $request->validated();
        $data["key"] = strtolower($data["name"]);

        $tag = new Tags();
        $tag->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Tag de curso criada com sucesso"
        ]);        
    }

    public function Alter(TagsRequest $request) {
        $data = $request->validated();
        $data["key"] = strtolower($data["name"]);

        $tag = Tags::firstWhere("id", "=", $data["id"]);
        if ($tag == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Essa tag não consta no banco de dados"
        ]);

        $tag->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Tag de curso editada com sucesso"
        ]);
    }

    public function Delete(TagsRequest $request) {
        $data = $request->validated();

        $tag = Tags::firstWhere("id", "=", $data["id"]);
        if ($tag == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Essa tag já não consta no banco de dados"
        ]);

        $tag->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Tag de curso deletada com sucesso"
        ]);
    }

}
