<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * Extends Illuminate\Routing\Controller (bukan default skeleton Laravel 11 yang
 * "bare") supaya `$this->middleware()` tersedia — dibutuhkan oleh
 * `authorizeResource()`/`authorize()` dari AuthorizesRequests yang dipakai
 * controller Admin untuk menegakkan Policy per-resource.
 */
abstract class Controller extends BaseController
{
    use AuthorizesRequests;
}
