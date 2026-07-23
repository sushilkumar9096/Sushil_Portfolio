const portfolioData = {
  personal: {
    name: "Sushilkumar Kuchame",
    title: "Full Stack .NET Developer",
    tagline: "Enthusiastic Full Stack .NET Developer specializing in ASP.NET Core Web API, MVC, C#, Entity Framework Core, SQL Server, and Clean Architecture.",
    location: "Pune, Maharashtra, India",
    phone: "+91 9096422669",
    email: "sushilofficial9096@gmail.com",
    github: "https://github.com/sushilkumar9096",
    linkedin: "https://www.linkedin.com/in/sushilkumar-kuchame-33849a242/",
    status: "Open for Opportunities",
    bio: "Enthusiastic Full Stack .NET Developer based in Pune with strong academic and project experience in building scalable web applications using C#, ASP.NET Core MVC, ASP.NET Core Web API, SQL Server, and Clean Architecture. Experienced in building secure RESTful APIs with JWT authentication, containerizing services with Docker, and developing responsive web frontends using HTML5, CSS3, and JavaScript.",
    metrics: [
      { label: "Degree", value: "B.Tech IT" },
      { label: "B.Tech CGPA", value: "7.17 / 10" },
      { label: "Primary Stack", value: "C# / .NET 8" },
      { label: "Certification", value: "Seed Infotech (2025)" }
    ]
  },

  skills: {
    backend: [
      { name: "ASP.NET Core Web API & MVC", level: 92, icon: "cpu" },
      { name: "C# (.NET 8 Ecosystem)", level: 90, icon: "code" },
      { name: "Entity Framework Core", level: 88, icon: "database" },
      { name: "RESTful Web APIs & Swagger", level: 94, icon: "globe" },
      { name: "JWT Bearer Auth & Refresh Tokens", level: 88, icon: "shield" },
      { name: "LINQ, DI & FluentValidation", level: 88, icon: "file-check" }
    ],
    frontend: [
      { name: "HTML5 & Semantic Web", level: 95, icon: "layout" },
      { name: "CSS3 & Modern Layouts", level: 90, icon: "palette" },
      { name: "JavaScript (ES6+ Vanilla JS)", level: 85, icon: "terminal" },
      { name: "Responsive Glassmorphism UI", level: 90, icon: "monitor" }
    ],
    database: [
      { name: "Microsoft SQL Server & SSMS", level: 88, icon: "database" },
      { name: "SQLite & Oracle Database", level: 82, icon: "database" },
      { name: "Docker & Docker Compose", level: 82, icon: "box" },
      { name: "Git & GitHub Version Control", level: 90, icon: "git-branch" },
      { name: "Postman API Testing", level: 92, icon: "send" }
    ],
    architecture: [
      { name: "Clean Architecture", level: 90, icon: "layers" },
      { name: "Repository & Unit of Work Patterns", level: 90, icon: "database" },
      { name: "Lazy & Eager Loading Strategies", level: 85, icon: "cpu" }
    ]
  },

  projects: [
    {
      id: "product-management",
      title: "Product Management System",
      category: "backend",
      featured: true,
      description: "Scalable RESTful Web API utilizing Clean Architecture, JWT Bearer Auth with Refresh Token Rotation, EF Core, Docker Compose, and Swagger specs.",
      longDescription: "Designed and built a scalable RESTful API utilizing Clean Architecture principles. Implemented JWT Bearer Authentication with Refresh Token Rotation and reuse detection. Managed database queries and automated schema migrations using EF Core on SQL Server. Containerized the application stack using Docker & Docker Compose for easy deployment. Integrated FluentValidation, global error handling middleware, and Swagger XML specs.",
      techStack: ["ASP.NET Core", "EF Core", "SQL Server", "Docker", "JWT Bearer", "FluentValidation", "Swagger"],
      github: "https://github.com/sushilkumar9096/ProductManagement",
      stars: 1,
      badge: "Featured API"
    },
    {
      id: "student-management",
      title: "Student Management System",
      category: "fullstack",
      featured: true,
      description: ".NET 8 Web API with EF Core, SQL Server, JWT Auth, Serilog structured logging, Swagger documentation, and a glassmorphic web UI.",
      longDescription: "A full-featured educational portal allowing administrators and students to manage course enrollments, attendance, and grades seamlessly. Built with a robust .NET 8 backend powering a sleek glassmorphic frontend UI.",
      techStack: [".NET 8", "C#", "SQL Server", "JWT Auth", "Serilog", "Swagger", "Glassmorphism UI"],
      github: "https://github.com/sushilkumar9096/StudentManagementSystem",
      stars: 1,
      badge: "Full Stack"
    },
    {
      id: "movie-management",
      title: "Movie Management System",
      category: "backend",
      featured: true,
      description: "ASP.NET Core backend to manage movies, actors, and genres with Clean Architecture, Repository/Unit of Work patterns, SQLite, and JWT authorization.",
      longDescription: "Developed an ASP.NET Core backend to manage movies, actors, and genres. Implemented clean architecture with Repository and Unit of Work patterns. Configured many-to-many database relationships using Entity Framework Core. Designed case-insensitive search and filter endpoints using query parameters. Secured write endpoints (POST, PUT, DELETE) using JWT authorization.",
      techStack: ["ASP.NET Core 8", "Web API", "EF Core", "SQLite", "JWT Auth", "Swagger"],
      github: "https://github.com/sushilkumar9096/MovieManagement",
      stars: 1,
      badge: "Backend System"
    },
    {
      id: "event-registration",
      title: "Event Registration System",
      category: "frontend",
      featured: false,
      description: "Interactive web registration platform enabling users to register for tech conferences, select sessions, and view registration statuses.",
      longDescription: "User-friendly web platform built with dynamic DOM manipulation, real-time input validation, responsive grid layouts, and seamless session tracking.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Web APIs"],
      github: "https://github.com/sushilkumar9096/EventRegistrationSystem",
      stars: 1,
      badge: "Web App"
    },
    {
      id: "online-banking",
      title: "Online Banking Transaction System",
      category: "backend",
      featured: false,
      description: "Secure ASP.NET online banking portal for account management, ledger transactions, and intra-bank money transfers.",
      longDescription: "Engineered with transaction security, atomic database operations, fraud-check validation logic, and detailed transaction audit logs.",
      techStack: ["ASP.NET", "C#", "SQL Server", "Security Architecture"],
      github: "https://github.com/sushilkumar9096/Online_Banking_Transaction_System",
      stars: 1,
      badge: "FinTech System"
    }
  ],

  codeSnippets: [
    {
      id: "controller",
      title: "Clean Architecture Controller",
      file: "ProductsController.cs",
      language: "csharp",
      code: `[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ProductResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var result = await _productService.GetByIdAsync(id, ct);
        if (result == null)
            return NotFound(new { message = $"Product with ID {id} not found." });

        return Ok(result);
    }
}`
    },
    {
      id: "jwt",
      title: "JWT Token Generator",
      file: "JwtTokenGenerator.cs",
      language: "csharp",
      code: `public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenGenerator(IOptions<JwtSettings> jwtOptions)
    {
        _jwtSettings = jwtOptions.Value;
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}`
    }
  ],

  timeline: [
    {
      period: "2025",
      type: "certification",
      role: "Full Stack .NET Developer Certificate",
      organization: "Seed Infotech",
      description: "Professional certification covering ASP.NET Core, C#, Web API, Entity Framework Core, SQL Server, and full-stack web application development."
    },
    {
      period: "2020 - 2024",
      type: "education",
      role: "Bachelor of Technology (B.Tech) in Information Technology",
      organization: "M.S. Bidve Engineering College",
      score: "CGPA: 7.17 / 10",
      description: "Graduated with B.Tech in IT. Focused on Software Engineering, Database Management Systems (SQL Server, Oracle), Data Structures, and Object-Oriented Programming."
    },
    {
      period: "2020",
      type: "education",
      role: "Higher Secondary Certificate (HSC) – Science",
      organization: "Azeem Junior College",
      score: "Percentage: 73.08%",
      description: "Completed Higher Secondary Education in Science stream with Mathematics and Computer Fundamentals."
    },
    {
      period: "2018",
      type: "education",
      role: "Secondary School Certificate (SSC)",
      organization: "Mukteshwar Vidyalaya",
      score: "Percentage: 86.40%",
      description: "Completed Secondary School Certificate with distinction."
    }
  ]
};
