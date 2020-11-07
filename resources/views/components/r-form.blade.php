<form onsubmit="event.preventDefault();rform(event.target)" method="get" {{ $id ? "id='".$id ."'" : ''  }}>
    {{ $slot }}
</form>