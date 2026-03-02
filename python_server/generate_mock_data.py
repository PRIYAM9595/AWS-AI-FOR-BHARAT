import pandas as pd
import random

# Generate a decent dummy dataset of courses and videos
data = {
    "course_id": range(1, 21),
    "title": [
        "Advanced React Patterns",
        "Mastering Node.js and Express",
        "System Design Interview Prep",
        "AWS Certified Solutions Architect",
        "Docker for Beginners",
        "Kubernetes from Scratch",
        "GraphQL API Development",
        "Python Data Science crash course",
        "Go (Golang) Microservices",
        "TypeScript Foundations",
        "React Native for Mobile Apps",
        "MongoDB Aggregations",
        "PostgreSQL Advanced Queries",
        "Next.js Ultimate Guide",
        "Tailwind CSS in Depth",
        "Figma to Code UI Design",
        "Serverless Architecture (AWS Lambda)",
        "CI/CD with GitHub Actions",
        "Web Accessibility (a11y) Masterclass",
        "Web Performance Optimization"
    ],
    "category": [
        "Frontend", "Backend", "Architecture", "Cloud", "DevOps", 
        "DevOps", "Backend", "Data", "Backend", "Frontend",
        "Mobile", "Database", "Database", "Frontend", "Frontend",
        "Design", "Cloud", "DevOps", "Frontend", "Frontend"
    ],
    "skills_covered": [
        "react, javascript, hooks, state management",
        "node.js, express, api, backend",
        "system design, scalable architecture, scaling",
        "aws, cloud, architecture, ec2, s3",
        "docker, containers, devops",
        "kubernetes, k8s, devops, orchestration",
        "graphql, api, apollo, backend",
        "python, data science, pandas, analytics",
        "go, golang, microservices, backend",
        "typescript, javascript, types, frontend",
        "react native, mobile, ios, android, react",
        "mongodb, nosql, databases, aggregations",
        "postgresql, sql, databases, relational",
        "next.js, react, ssr, ssg, frontend",
        "tailwind, css, styling, ui, frontend",
        "figma, design, ui, ux, html, css",
        "serverless, aws lambda, cloud",
        "ci/cd, github actions, devops, deployment",
        "accessibility, a11y, frontend, html",
        "performance, lighthouse, optimization, frontend"
    ],
    "url": [
        "https://youtube.com/watch?v=dummy_react",
        "https://youtube.com/watch?v=dummy_node",
        "https://youtube.com/watch?v=dummy_system",
        "https://youtube.com/watch?v=dummy_aws",
        "https://youtube.com/watch?v=dummy_docker",
        "https://youtube.com/watch?v=dummy_k8s",
        "https://youtube.com/watch?v=dummy_graphql",
        "https://youtube.com/watch?v=dummy_python",
        "https://youtube.com/watch?v=dummy_go",
        "https://youtube.com/watch?v=dummy_typescript",
        "https://youtube.com/watch?v=dummy_rn",
        "https://youtube.com/watch?v=dummy_mongodb",
        "https://youtube.com/watch?v=dummy_postgresql",
        "https://youtube.com/watch?v=dummy_nextjs",
        "https://youtube.com/watch?v=dummy_tailwind",
        "https://youtube.com/watch?v=dummy_figma",
        "https://youtube.com/watch?v=dummy_serverless",
        "https://youtube.com/watch?v=dummy_cicd",
        "https://youtube.com/watch?v=dummy_a11y",
        "https://youtube.com/watch?v=dummy_performance"
    ],
    "duration_hours": [random.randint(2, 12) for _ in range(20)],
    "difficulty": [random.choice(["Beginner", "Intermediate", "Advanced"]) for _ in range(20)]
}

df = pd.DataFrame(data)
df.to_csv("courses.csv", index=False)
print("Mock courses.csv generated successfully.")
