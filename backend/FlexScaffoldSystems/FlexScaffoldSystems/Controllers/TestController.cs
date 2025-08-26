using Microsoft.AspNetCore.Mvc;

namespace FlexScaffoldSystems.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : Controller
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello World!");
    }
}