<!DOCTYPE html>
<html>
<head>
    <title>RT Digital</title>
</head>
<body>
    <h1>Olá, {{ $details["name"] }}</h1>
    <p>Obrigado por ter cadastrado seu e-mail no RT Digital! Clique no link abaixo para criar uma senha e ativar a sua conta</p>
    <a href="{{ 'http://localhost:3000/user/' . $details["emailname_id"] . '/activate' }}">
        {{ 'http://localhost:3000/user/' . $details["emailname_id"] . '/activate' }}
    </a>
    
    <p>Obrigado</p>
</body>
</html>