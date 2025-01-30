const env = process.env.NODE_ENV || "development";

const config = {
    development: {
        baseUrl: "http://localhost:8080/api",
    },
    production: {
        baseUrl: "http://34.27.237.197:8080/api",
    },
};

export default config[env];