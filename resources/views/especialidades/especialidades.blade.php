@extends('includes.main')

@section('content')
@include('includes.menu')
<div class="container-All">
    <h1>bootstrap-show-toast</h1>
    <p>
        A Bootstrap plugin, to create toasts (also called notifications) dynamically in JavaScript.
    </p>
    <h2>Examples</h2>
    <p>
        <button type="button" id="button-show-simple" class="btn btn-primary">Show a simple toast</button>
    </p>
    <p>
        <button type="button" id="button-show-info" class="btn btn-info">Show a complex toast with header and buttons
        </button>
    </p>
    <p>
        <button type="button" id="button-show-danger" class="btn btn-danger">Show a danger-toast</button>
    </p>
    <p>
        <button type="button" id="button-show-sticky" class="btn btn-secondary">Show a sticky toast with infinite duration</button>
    </p>
</div>
@endsection

@section('scripts')
<script src="{{ asset('assets/js/especialidades/especialidades.js') }}"></script>
@endsection