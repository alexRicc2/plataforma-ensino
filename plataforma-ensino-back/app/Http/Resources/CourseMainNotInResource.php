<?php

namespace App\Http\Resources;

use App\Models\CourseEvaluation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CourseMainNotInResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);
        if (Auth::id() !== null) {
            $data["rateAverage"] = $this->RateAverage();
            $data["responsibles"] = $this->Responsibles();
            $data["evaluations"] = CourseEvaluationResource::collection($this->Rate()
            ->where("points", isset($request->evaluationFilter) ? $request->evaluationFilter : true)
            ->get());
            $data["evaluationsPerPoints"] = [
                $this->FormatPerPoints(1),
                $this->FormatPerPoints(2),
                $this->FormatPerPoints(3),
                $this->FormatPerPoints(4),
                $this->FormatPerPoints(5)
            ];
        }
        return $data;
    }

    public function FormatPerPoints($points) {
        $evaluations = CourseEvaluation::where("course_id", $this->id)->get();

        if (sizeof($evaluations) == 0) return [
            "totalEvaluationsPerPoints" => 0,
            "percentageRelative" => 0,
            "points" => $points
        ];

        $evaluationsPerPoints = CourseEvaluation::where("course_id", $this->id)
        ->where("points", $points)
        ->get();

        $percentage = sizeof($evaluationsPerPoints) * 100 / sizeof($evaluations);

        return [
            "totalEvaluationsPerPoints" => sizeof($evaluationsPerPoints),
            "percentageRelative" => $percentage,
            "points" => $points
        ];
    }

}