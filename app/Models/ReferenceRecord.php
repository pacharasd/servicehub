<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferenceRecord extends Model
{
    // The generic model serves five tables; validation restricts mass assignment.
    protected $guarded = [];
}
