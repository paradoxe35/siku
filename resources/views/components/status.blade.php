<span class="badge badge-dot mr-4">
    @if ($value)
    <i class="bg-success"></i>
    @else
    <i class="bg-danger"></i>
    @endif
    <span class="status">{{ $value ? $active : $inactive }}</span>
</span>