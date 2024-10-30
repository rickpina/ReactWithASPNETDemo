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

        [HttpPost]
        public IActionResult GetData([FromBody] DataRequest request)
        {
            var people = new List<Person>
            {
                new Person { FirstName = "John", LastName = "Doe", Age = 29, Email = "john.doe@example.com", City = "New York" },
                new Person { FirstName = "Jane", LastName = "Smith", Age = 34, Email = "jane.smith@example.com", City = "Los Angeles" },
                new Person { FirstName = "Alice", LastName = "Johnson", Age = 42, Email = "alice.johnson@example.com", City = "Chicago" },
                new Person { FirstName = "Bob", LastName = "Brown", Age = 26, Email = "bob.brown@example.com", City = "Houston" },
                new Person { FirstName = "Eve", LastName = "Davis", Age = 38, Email = "eve.davis@example.com", City = "Phoenix" }
            };

            Console.WriteLine($"{request.SortColumn}, {request.SortOrder}, {request.SearchQuery}");

            //// Apply search filter if a search query is provided
            //if (!string.IsNullOrEmpty(request.SearchQuery))
            //{
            //    people = people.Where(d => d.Name.Contains(request.SearchQuery, StringComparison.OrdinalIgnoreCase)
            //                        || d.Age.ToString().Contains(request.SearchQuery)).ToList();
            //}

            //// Apply sorting based on the sort column and order
            //people = request.SortColumn switch
            //{
            //    "name" => request.SortOrder == "asc" ? people.OrderBy(d => d.Name).ToList() : people.OrderByDescending(d => d.Name).ToList(),
            //    "age" => request.SortOrder == "asc" ? people.OrderBy(d => d.Age).ToList() : people.OrderByDescending(d => d.Age).ToList(),
            //    _ => people // Default case if no sorting specified
            //};

            return Ok(people);
        }

    }
}
