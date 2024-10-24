using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReactWithASPDemo.Server.Models;

namespace ReactWithASPDemo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly ILogger<PersonController> _logger;

        public PersonController(ILogger<PersonController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetPersonData")]
        public IEnumerable<Person> Get()
        {
            var people = new List<Person>
            {
                new Person { FirstName = "John", LastName = "Doe", Age = 29, Email = "john.doe@example.com", City = "New York" },
                new Person { FirstName = "Jane", LastName = "Smith", Age = 34, Email = "jane.smith@example.com", City = "Los Angeles" },
                new Person { FirstName = "Alice", LastName = "Johnson", Age = 42, Email = "alice.johnson@example.com", City = "Chicago" },
                new Person { FirstName = "Bob", LastName = "Brown", Age = 26, Email = "bob.brown@example.com", City = "Houston" },
                new Person { FirstName = "Eve", LastName = "Davis", Age = 38, Email = "eve.davis@example.com", City = "Phoenix" }
            };

            return people;

            
        }

    }
}
