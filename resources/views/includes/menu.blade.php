<nav class="navbar navbar-expand-lg" style="background-color: #ebf6f9;">
    <div class="container-fluid">
        <a class="navbar-brand navbar-text" href="{{ route('home') }}"><img class="logo-menu" src="{{ asset('assets/images/logo.jpg') }}" alt="Logo escrito santa casa"></a>
        <button class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end navbar-menu" id="menu">
            <ul class="navbar-nav">
                <li class="nav-item btn-navbar">
                    <a class="nav-link" href="{{ route('home') }}"><img class="icon-menu" src="{{ asset('assets/icons/home.svg') }}" alt="icone Home">Home</a>
                </li>
                <li class="nav-item btn-navbar">
                    <a class="nav-link" href="{{ route('medico.index') }}"><img class="icon-menu" src="{{ asset('assets/icons/medico.svg') }}" alt="icone Medico">Médicos</a>
                </li>
                <li class="nav-item btn-navbar">
                    <a class="nav-link" href="{{ route('relatorio') }}"><img class="icon-menu" src="{{ asset('assets/icons/relatorio.svg') }}" alt="icone Relatorio">Relatório</a>
                </li>
                <li class="nav-item btn-navbar">
                    <a class="nav-link" href="{{  route('especialidade.index') }}"><img class="icon-menu" src="{{ asset('assets/icons/especialidade.svg') }}" alt="icone Especialidade">Especialidades</a>
                </li>
            </ul>
        </div>
    </div>
</nav>