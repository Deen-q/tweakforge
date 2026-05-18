// A single instance all API routes will import from
// |-> reason being to maximis the chance of reusing the same module instance across warm invocations (serverless-related)

// note: lib/ is standard for shared code (that the rest of the app imports from) that is not a component, page or API route
import postgres from "postgres";

const sql = postgres(process.env.NEON_CONNECTION_STRING!);

export default sql;