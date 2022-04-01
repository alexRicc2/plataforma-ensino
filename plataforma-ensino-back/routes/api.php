<?php

use App\Http\Controllers\AdvertisingVideoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login')->name('login');
    Route::get('user', 'AuthController@user')->name('user');
    Route::post('register', 'AuthController@register');
    Route::post('edit_profile', 'AuthController@edit_profile');

    Route::get('get_data_registration', 'RegistrationController@get_data_registration')->name('get_data_registration');
    Route::post('store_registration', 'RegistrationController@store_registration')->name('store_registration');
});

Route::group([
    "prefix" => "styles"
], function () {
    Route::group([
        "prefix" => "general"
    ], function () {
        Route::get("/", "GeneralStyleController@Get");

        Route::post("/update", "GeneralStyleController@Update");
    });

    Route::group([
        "prefix" => "pages"
    ], function () {
        Route::get("/", "PagesStyleController@Get");
        Route::get("/key/{page_key}", "PagesStyleController@GetByKey");

        Route::post("/update", "PagesStyleController@Update");
    });

    Route::group([
        "prefix" => "courses-lp"
    ], function () {
        Route::get("/one/{course_id}", "CoursesLPStylesController@GetOne");
        Route::get("/one-name/{course_name}", "CoursesLPStylesController@GetOneName");

        Route::post("/update", "CoursesLPStylesController@Update");
    });
});

Route::group([
    "prefix" => "user"
], function () {
    Route::get("/", "UserController@Get");
    Route::get("/account-exists/{email}", "UserController@AccountExists");
    Route::get("/account-statistics/{user_id}", "UserController@AccountStatistics");
    Route::get("/privileged", "UserController@GetPrivileged");

    Route::post("/delete", "UserController@Delete");
});

Route::group([
    "prefix" => "emails"
], function () {
    Route::get("/", "EmailController@Get");

    Route::post("/delete", "EmailController@Delete");

    Route::group([
        "prefix" => "actions",
        "middleware" => "auth:api"
    ], function () {
        Route::get("/", "EmailActionsController@Get");
        Route::post("/create", "EmailActionsController@Create");
        Route::post("/alter", "EmailActionsController@Alter");
        Route::post("/delete", "EmailActionsController@Delete");
    });
});

Route::get('get_cursos', 'CursoController@get_cursos')->name('get_cursos');

Route::group([

    'middleware' => 'auth:api'

], function ($router) {
    Route::post('store_cursos', 'CursoController@store_cursos')->name('store_cursos');
    Route::patch('update_cursos', 'CursoController@update_cursos')->name('update_cursos');
    Route::get('get_data_curso/{id}', 'CursoController@get_data_curso')->name('get_data_curso');
    Route::delete('delete_curso/{id}', 'CursoController@delete_curso')->name('delete_curso');

    Route::get('get_data_polo', 'PoloController@get_data_polo')->name('get_data_polo');
    Route::post('store_polo', 'PoloController@store_polo')->name('store_polo');
    Route::get('get_polos', 'PoloController@get_polos')->name('get_polos');
    Route::get('get_editar_polo/{id}', 'PoloController@get_editar_polo')->name('get_editar_polo');
    Route::patch('update_polo', 'PoloController@update_polo')->name('update_polo');
    Route::delete('delete_polo/{id}', 'PoloController@delete_polo')->name('delete_polo');

    Route::get('get_inscricoes', 'RegistrationController@get_inscricoes')->name('get_inscricoes');
    Route::get('get_view_inscricao/{id}', 'RegistrationController@get_view_inscricao')->name('get_view_inscricao');

    Route::post('registration/paid/{id}', 'RegistrationController@paid')->name('registration.paid');

    Route::get("/roles", "UserRoleController@Get");

    Route::group([ //Cursos da plataforma de vídeos
        "prefix" => "courses-main"
    ], function () {
        Route::get("/", "CourseMainController@Get");
        Route::get("/one/{course_id}", "CourseMainController@GetOne");
        Route::get("/lessons/{course_id}", "CourseMainController@GetLessons");

        Route::post("/create", "CourseMainController@Create")->middleware("role:admin");
        Route::post("/update", "CourseMainController@Update")->middleware("role:admin,professor");
        Route::post("/delete", "CourseMainController@Delete")->middleware("role:admin");
        ROute::post("/upload-image", "CourseMainController@UploadImage");

        Route::group([
            "prefix" => "free",
            "excluded_middleware" => ["auth:api"]
        ], function () {
            Route::get("/", "CourseMainController@GetFree");
            // Route::get("/files", "LessonFilesController@GetFree");
        });

        Route::group([
            "prefix" => "groups"
        ], function () {
            Route::get("/", "CourseGroupController@Get");
            Route::get("/outside", "CourseGroupController@GetOutsideGroups");

            Route::post("/create", "CourseGroupController@Create");
            Route::post("/delete", "CourseGroupController@Delete");
        });

        Route::group([
            "prefix" => "related-info"
        ], function () {
            Route::get("/", "CourseRelatedController@Get");
            Route::get("/modules", "CourseRelatedController@Modules");
        });

        Route::group([
            "prefix" => "files"
        ], function () {
            Route::get("/", "CourseMainController@GetFiles");
        });

        Route::group([
            "prefix" => "category"
        ], function () {
            Route::get("/", "CoursesCategoryController@Get")->withoutMiddleware("auth:api");
            Route::get("/one/{category_id}", "CoursesCategoryController@GetOne")->middleware("role:admin");

            Route::post("/create", "CoursesCategoryController@Create")->middleware("role:admin");
            Route::post("/update", "CoursesCategoryController@Update")->middleware("role:admin");
            Route::post("/delete", "CoursesCategoryController@Delete")->middleware("role:admin");
        });

        Route::group([
            "prefix" => "tags"
        ], function () {
            Route::get("/", "TagsController@Get")->middleware("role:admin");

            Route::post("/create", "TagsController@Create")->middleware("role:admin");
            Route::post("/alter", "TagsController@Alter")->middleware("role:admin");
            Route::post("/delete", "TagsController@Delete")->middleware("role:admin");
        });

        Route::group([
            "prefix" => "evaluations",
            "middleware" => "auth:api"
        ], function () {
            Route::get("/", "CourseEvaluationController@Get");

            Route::post("/create", "CourseEvaluationController@Create");
            Route::post("/alter", "CourseEvaluationController@Alter");
            Route::post("/delete", "CourseEvaluationController@Delete");
        });
    });

    Route::group([
        "prefix" => "modules"
    ], function () {
        Route::get("/", "ModuleController@Get");

        Route::post("/create", "ModuleController@Create");
        Route::post("/alter", "ModuleController@Alter");
        Route::post("/delete", "ModuleController@Delete");
    });

    Route::group([
        "prefix" => "lessons"
    ], function () {
        Route::get("/", "LessonController@Get");
        Route::get("/one/{lesson_id}", "LessonController@GetOne");

        Route::group([
            "prefix" => "files"
        ], function () {
            Route::get("/", "LessonFilesController@Get");

            Route::post("/alter", "LessonFilesController@Alter");
            Route::post("/delete", "LessonFilesController@Delete");
            Route::post("/log", "UserFileController@Log");

            Route::group([
                "prefix" => "comments"
            ], function() {
                Route::get("/", "UserFileCommentController@Get");

                Route::post("/create", "UserFileCommentController@Create");
                Route::post("/alter", "UserFileCommentController@Alter");
                Route::post("/delete", "UserFileCommentController@Delete");
            });
        });

        Route::group([
            "prefix" => "annotations"
        ], function() {
            Route::get("/", "LessonAnnotationController@Get");

            Route::post("/create", "LessonAnnotationController@Create");
            Route::post("/alter", "LessonAnnotationController@Alter");
            Route::post("/delete", "LessonAnnotationController@Delete");
        });

        Route::group([
            "prefix" => "exercise"
        ], function() {
            Route::post("/submit", "ExerciseController@Submit");
            Route::post("/log", "ExerciseController@Log");
        });

        Route::post("/create", "LessonController@Create")->middleware("role:admin,professor");
        Route::post("/update", "LessonController@Update")->middleware("role:admin,professor");
        Route::post("/delete", "LessonController@Delete")->middleware("role:admin,professor");
    });

    Route::group([
        "prefix" => "user-course"
    ], function () {
        Route::get("/from/course/{course_id}", "UserCourseController@GetFromCourse");
        Route::get("/from/user/{user_id}", "UserCourseController@GetFromUser");

        Route::post("/create", "UserCourseController@Create")->middleware("role:admin,professor");
        Route::post("/delete", "UserCourseController@Delete");
        Route::post("/adquire", "UserCourseController@Adquire");
    });

    Route::group([
        "prefix" => "user-list-course"
    ], function () {
        Route::get("/", "UserListCourseController@Get");

        Route::post("/create", "UserListCourseController@Create");
        Route::post("/delete", "UserListCourseController@Delete");
    });

    Route::group([
        "prefix" => "pre-register"
    ], function () {
        Route::get("/", "CoursePreRegisterController@Get");

        Route::post("/create", "CoursePreRegisterController@Create");
        Route::post("/delete", "CoursePreRegisterController@Delete");
    });

    Route::group([
        "prefix" => "groups"
    ], function() {
        Route::get("/", "GroupController@Get");

        Route::post("/create", "GroupController@Create")->middleware("role:admin");
        Route::post("/alter", "GroupController@Alter")->middleware("role:admin");
        Route::post("/delete", "GroupController@Delete")->middleware("role:admin");

        Route::group([
            "prefix" => "users"
        ], function () {
            Route::get("/", "UserGroupController@Get");

            Route::post("/create", "UserGroupController@Create");
            Route::post("/delete", "UserGroupController@Delete");
        });
    });
});
Route::group([
    "prefix" => "emailname"
], function(){
    Route::get("/", "EmailNameController@Get");
    Route::post("/create", "EmailNameController@Create");
    Route::post("/delete", "EmailNameController@Delete");
    Route::post("/activate", "EmailNameController@ActiveAccount");
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::post("/send-link", "EmailNameController@SendLink")->middleware("role:admin");
    });
});

Route::group([
    "prefix" => "science-plus"
], function () {
    Route::get("/", "SciencePlusPostController@Get");
    Route::group([
        "middleware" => "auth:api"
    ], function () {
        Route::post("/create", "SciencePlusPostController@Create");
        Route::post("/alter", "SciencePlusPostController@Alter");
        Route::post("/delete", "SciencePlusPostController@Delete");
        Route::post("/upload-image", "SciencePlusPostController@UploadImage");
    });
});

Route::group([
    "prefix" => "site-rt"
], function(){
    Route::group([
        "prefix" => "testimonial"
    ], function(){
        Route::get("/", "SiteRTTestimonialController@Get");
        Route::group([

            'middleware' => 'auth:api'

        ], function ($router) {
            Route::post("/create", "SiteRTTestimonialController@Create")->middleware("role:admin");
            Route::post("/alter", "SiteRTTestimonialController@Alter")->middleware("role:admin");
            Route::post("/delete", "SiteRTTestimonialController@Delete")->middleware("role:admin");
        });

    });
    
    Route::group([
        "prefix" => "description"
        
    ], function(){
        Route::get("/","SiteRTDescriptionController@Get");
        Route::group([

            'middleware' => 'auth:api'

        ], function ($router) {
            Route::post("/update", "SiteRTDescriptionController@Update")->middleware("role:admin");
        });
    });

    Route::group([
        "prefix" => "bannerPrincipal-images"
    ], function(){
        Route::get("/", "BannerPrincipalController@Get");
        Route::group([
            'middleware' => 'auth:api'
        ], function ($router){
            Route::post("/create", "BannerPrincipalController@Create")->middleware("role:admin");
            Route::post("/alter", "BannerPrincipalController@Alter")->middleware("role:admin");
            Route::post("/delete", "BannerPrincipalController@Delete")->middleware("role:admin");
        });
    });

    Route::group([
        "prefix" => "advertising-video"
    ], function () {
        Route::get("/", "AdvertisingVideoController@Get");
        Route::post("/update", "AdvertisingVideoController@Update")->middleware("auth:api");
    });

    Route::group([
        "prefix" => "aside-banner"
    ], function () {
        Route::get("/", "AsideBannerController@Get");

        Route::post("/create", "AsideBannerController@Create")->middleware("auth:api");
        Route::post("/delete", "AsideBannerController@Delete")->middleware("auth:api");
    });

    Route::group([
        "prefix" => "about-us-page"
    ], function() {
        Route::get("/", "AboutUsPageController@Get");
        Route::post("/update", "AboutUsPageController@Update")->middleware("auth:api");
    });

    Route::group([
        "prefix" => "mission-page"
    ], function() {
        Route::get("/", "MissionPageController@Get");
        Route::post("/update", "MissionPageController@Update")->middleware("auth:api");
    });

    Route::group([
        "prefix" => "team-members"
    ], function() {
        Route::get("/", "TeamMemberController@Get");

        Route::group([
            "middleware" => "auth:api"
        ], function() {
            Route::post("/create", "TeamMemberController@Create")->middleware("role:admin");
            Route::post("/alter", "TeamMemberController@Alter")->middleware("role:admin");
            Route::post("/delete", "TeamMemberController@Delete")->middleware("role:admin");
        });
    });

});

Route::group([
    "prefix" => "site-itec"
], function () {
    Route::group([
        "prefix" => "news"
    ], function () {
        Route::get("/", "SiteItecNewsController@Get");
        Route::group([

            'middleware' => 'auth:api'

        ], function ($router) {
            Route::post("/create", "SiteItecNewsController@Create")->middleware("role:admin");
            Route::post("/alter", "SiteItecNewsController@Alter")->middleware("role:admin");
            Route::post("/delete", "SiteItecNewsController@Delete")->middleware("role:admin");
        });

        Route::post("/upload-image", "SiteItecNewsController@UploadImage");
    });

    Route::get("/courses", "SiteItecController@GetCourses");

    Route::group([
        "prefix" => "ads-banner-images"
    ], function () {
        Route::get("/", "SiteItecAdsImagesController@Get");
        Route::group([

            'middleware' => 'auth:api'

        ], function ($router) {
            Route::post("/create", "SiteItecAdsImagesController@Create")->middleware("role:admin");
            Route::post("/alter", "SiteItecAdsImagesController@Alter")->middleware("role:admin");
            Route::post("/delete", "SiteItecAdsImagesController@Delete")->middleware("role:admin");
        });
    });

    Route::group([
       "prefix" => "institutional" 
    ], function(){
        Route::get("/","SiteItecInstitutionalController@Get");

        Route::group([
            'middleware' => 'auth:api'
        ], function ($router){
            Route::post("/update", "SiteItecInstitutionalController@Update")->middleware("role:admin");
            
        });
        Route::post("/upload-image", "SiteItecInstitutionalController@UploadImage");

    });

    Route::group([
        "prefix" => "posts"
    ], function () {
        Route::get("/", "SiteItecPostsController@Get");
        Route::group([

            'middleware' => 'auth:api'

        ], function ($router) {
            Route::post("/create", "SiteItecPostsController@Create")->middleware("role:admin");
            Route::post("/alter", "SiteItecPostsController@Alter")->middleware("role:admin");
            Route::post("/delete", "SiteItecPostsController@Delete")->middleware("role:admin");
        });
    });
});
