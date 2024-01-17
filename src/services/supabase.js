import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://uemnpkohpvggupqlwpsk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbW5wa29ocHZnZ3VwcWx3cHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwNDQ1OTEsImV4cCI6MjAwODYyMDU5MX0.L_tK_Pucjb8ypS88WTkY-xUZxp0RhMUyVIwSW9L0aF4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
