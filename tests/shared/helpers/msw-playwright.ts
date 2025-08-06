import { Page } from '@playwright/test';
import { clerkHandlers } from '../mocks/handlers/clerk';
import { supabaseHandlers } from '../mocks/handlers/supabase';

/**
 * Sets up MSW mocking for a Playwright page
 * This approach uses Playwright's route interception instead of Service Worker
 */
export async function setupMocking(page: Page) {
  // Intercept Clerk API calls
  await page.route('https://api.clerk.dev/**', async (route) => {
    const url = route.request().url();
    const method = route.request().method();
    
    // Find matching handler
    const handler = [...clerkHandlers].find(h => {
      const handlerMethod = h.info.method || 'GET';
      const handlerPath = h.info.path;
      
      // Simple path matching (in real app, use proper path-to-regexp)
      const pathMatch = typeof handlerPath === 'string' 
        ? url.includes(handlerPath.replace(/:\w+/g, ''))
        : handlerPath.test(url);
      
      return handlerMethod === method && pathMatch;
    });

    if (handler) {
      // Execute the handler to get the response
      const request = route.request();
      const response = await handler.resolver({
        request,
        params: {},
        cookies: {},
      });

      if (response instanceof Response) {
        const body = await response.json();
        await route.fulfill({
          status: response.status,
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
        return;
      }
    }

    // If no handler found, continue with the request
    await route.continue();
  });

  // Intercept Supabase API calls
  await page.route('https://*.supabase.co/**', async (route) => {
    const url = route.request().url();
    const method = route.request().method();
    
    // Find matching handler
    const handler = [...supabaseHandlers].find(h => {
      const handlerMethod = h.info.method || 'GET';
      const handlerPath = h.info.path;
      
      const pathMatch = typeof handlerPath === 'string'
        ? url.includes(handlerPath.replace(/:\w+/g, ''))
        : handlerPath.test(url);
      
      return handlerMethod === method && pathMatch;
    });

    if (handler) {
      const request = route.request();
      const response = await handler.resolver({
        request,
        params: {},
        cookies: {},
      });

      if (response instanceof Response) {
        const body = await response.json();
        await route.fulfill({
          status: response.status,
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
        return;
      }
    }

    await route.continue();
  });

  // Intercept Clerk frontend API
  await page.route('https://*.clerk.accounts.dev/**', async (route) => {
    // Mock the Clerk frontend resources
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: '// Mocked Clerk frontend script',
    });
  });
}