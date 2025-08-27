namespace FlexScaffoldSystems.Middlewares;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? ErrorMessage { get; set; }

    public ApiResponse(bool success, T? data = default, string? errorMessage = null)
    {
        Success = success;
        Data = data;
        ErrorMessage = errorMessage;
    }


    public static ApiResponse<T> Ok(T data, string? message = null)
        => new ApiResponse<T>(true, data, message);

    public static ApiResponse<T> Fail(string? errorMessage = null)
        => new ApiResponse<T>(false, default, errorMessage);
}
