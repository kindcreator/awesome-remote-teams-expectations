import { setupWorker } from 'msw/browser';
import { clerkHandlers } from './handlers/clerk';
import { supabaseHandlers } from './handlers/supabase';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...clerkHandlers,
  ...supabaseHandlers,
);