import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey ? "Loaded" : "Not Loaded");


const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function signInAnonymously() {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) console.log("Error signing in:", error);
    else console.log("Signed in anonymously:", data);
  }
  
  signInAnonymously();

export default supabase;
