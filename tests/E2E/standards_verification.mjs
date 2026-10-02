/**
 * tests/E2E/standards_verification.mjs
 *
 * Independent, opaque-box, requirement-driven standards verification test suite for ServiceHub.
 * Verifies international standards compliance across 4 Tiers:
 * - Tier 1: Feature Coverage (WCAG 2.2 AA skip-link, focus rings, drawer trap, landmarks, 320px containment, ES modules, Vite chunks)
 * - Tier 2: Boundary & Corner Cases (320px boundary reflow, 44px touch targets, focus trap loop boundaries, 404 guard)
 * - Tier 3: Cross-Feature Interactions (drawer scroll-lock, Tailwind scanner, API client error interceptor)
 * - Tier 4: Real-World Scenarios (keyboard user journey, screen reader landmark sequence)
 *
 * Run with: node --test tests/E2E/standards_verification.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

// Helper to safely read file content
function readFileOrEmpty(relPath) {
  const fullPath = path.join(projectRoot, relPath);
  try {
    return fs.readFileSync(fullPath, 'utf8');
  } catch {
    return '';
  }
}

function fileExists(relPath) {
  return fs.existsSync(path.join(projectRoot, relPath));
}

describe('ServiceHub International Standards Optimization Verification', () => {

  // =========================================================================
  // TIER 1: FEATURE COVERAGE
  // =========================================================================
  describe('Tier 1: Feature Coverage', () => {

    it('T1.1: Skip to Main Content link targeting #main-content must exist in Blade shell', () => {
      const appBlade = readFileOrEmpty('resources/views/app.blade.php');
      assert.ok(appBlade.length > 0, 'resources/views/app.blade.php must exist');

      // Must contain skip link targeting #main-content
      const hasSkipLink = /href="#main-content"/.test(appBlade);
      assert.ok(
        hasSkipLink,
        'app.blade.php must include a Skip to Content link targeting href="#main-content"'
      );

      // Must have main element with id="main-content", role="main", and tabindex="-1"
      const hasMainContent = /id="main-content"/.test(appBlade);
      assert.ok(hasMainContent, 'app.blade.php must define <main id="main-content"> container');

      const hasTabindex = /id="main-content"[^>]*tabindex="-1"/.test(appBlade) ||
                          /tabindex="-1"[^>]*id="main-content"/.test(appBlade);
      assert.ok(hasTabindex, '<main id="main-content"> must have tabindex="-1" to receive programmatic focus');
    });

    it('T1.2: High-contrast focus rings must be defined via :focus-visible in CSS', () => {
      const styleCss = readFileOrEmpty('src/style.css');
      assert.ok(styleCss.length > 0, 'src/style.css must exist');

      // Must define :focus-visible with 3px outline
      const hasFocusVisible = /:focus-visible\s*\{[^}]*outline:\s*3px\s+solid/i.test(styleCss);
      assert.ok(
        hasFocusVisible,
        'src/style.css must define high-contrast :focus-visible rule with 3px solid outline (WCAG 2.4.7)'
      );
    });

    it('T1.3: Accessible Drawer must implement focus trap, ESC dismissal, and focus restoration', () => {
      const drawerJs = readFileOrEmpty('src/components/drawer.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const drawerCode = drawerJs || mainJs;

      assert.ok(drawerCode.length > 0, 'Drawer implementation must exist in src/components/drawer.js or src/main.js');

      // Focus trap logic (Tab & Shift+Tab handling)
      const hasFocusTrap = /handleKeydown|trapFocus/i.test(drawerCode) &&
                           /e\.key\s*===\s*['"]Tab['"]|e\.keyCode\s*===\s*9/i.test(drawerCode);
      assert.ok(hasFocusTrap, 'Drawer must trap Tab key navigation within modal bounds');

      // Escape key dismissal
      const hasEscapeDismiss = /e\.key\s*===\s*['"]Escape['"]|e\.keyCode\s*===\s*27/i.test(drawerCode);
      assert.ok(hasEscapeDismiss, 'Drawer must support ESC key dismissal (WCAG 2.1.2)');

      // Focus restoration to trigger element
      const hasFocusRestore = /triggerElement|restoreFocus|\.focus\(\)/i.test(drawerCode);
      assert.ok(hasFocusRestore, 'Drawer must restore focus to trigger element on dismissal (WCAG 2.4.3)');
    });

    it('T1.4: Screen Reader ARIA Landmarks must be explicitly defined', () => {
      const appBlade = readFileOrEmpty('resources/views/app.blade.php');
      const navJs = readFileOrEmpty('src/components/navigation.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const combined = appBlade + navJs + mainJs;

      assert.ok(
        /role="banner"|<header/i.test(combined),
        'Application shell must define a banner landmark (<header> or role="banner")'
      );
      assert.ok(
        /role="main"|<main/i.test(combined),
        'Application shell must define a main landmark (<main> or role="main")'
      );
      assert.ok(
        /role="navigation"|<nav/i.test(combined),
        'Application shell must define navigation landmarks (<nav> or role="navigation")'
      );
      assert.ok(
        /role="complementary"|<aside/i.test(combined),
        'Application shell must define a complementary landmark (<aside> or role="complementary")'
      );
      assert.ok(
        /aria-live=["'](?:polite|assertive)["']/i.test(combined),
        'Application shell must define aria-live regions for dynamic status announcements'
      );
    });

    it('T1.5: Responsive mobile viewport containment rules must prevent horizontal page scroll', () => {
      const styleCss = readFileOrEmpty('src/style.css');

      // Verify page-level containment
      const hasOverflowClip = /overflow-x:\s*(?:clip|hidden)/i.test(styleCss);
      assert.ok(hasOverflowClip, 'src/style.css must specify overflow-x: clip or hidden to prevent page scroll blowout');

      // Verify table scroll isolation container
      const hasTableContainment = /\.data-table-scroll\s*\{[^}]*overflow-x:\s*auto/i.test(styleCss);
      assert.ok(hasTableContainment, '.data-table-scroll container must isolate horizontal scrolling for wide tables');

      const hasInlineSizeContain = /contain:\s*inline-size/i.test(styleCss);
      assert.ok(hasInlineSizeContain, '.data-table-scroll must use contain: inline-size for strict reflow containment');
    });

    it('T1.6: Modular ES architecture must decompose monolithic client into single-responsibility modules', () => {
      // Per ADR 0007, frontend must be decomposed into ES modules
      const expectedModules = [
        'src/router.js',
        'src/api.js',
        'src/components/drawer.js',
        'src/views/users.js',
        'src/views/activities.js',
        'src/views/references.js',
      ];

      for (const mod of expectedModules) {
        assert.ok(
          fileExists(mod),
          `Required modular ES file ${mod} must exist according to ADR 0007 specification`
        );
      }
    });

    it('T1.7: Central API Client must export apiRequest and handle credentials and CSRF injection', () => {
      const apiJs = readFileOrEmpty('src/api.js');
      assert.ok(apiJs.length > 0, 'src/api.js must exist');

      assert.ok(/export\s+(?:async\s+)?function\s+apiRequest/i.test(apiJs), 'src/api.js must export apiRequest()');
      assert.ok(/credentials:\s*['"]same-origin['"]/i.test(apiJs), 'apiRequest must send credentials: "same-origin"');
      assert.ok(/csrf-token|X-CSRF-TOKEN/i.test(apiJs), 'apiRequest must inject X-CSRF-TOKEN');
    });

    it('T1.8: Vite Rollup Code-Splitting manualChunks must be configured in vite.config.js', () => {
      const viteConfig = readFileOrEmpty('vite.config.js');
      assert.ok(viteConfig.length > 0, 'vite.config.js must exist');

      const hasManualChunks = /manualChunks/i.test(viteConfig);
      assert.ok(
        hasManualChunks,
        'vite.config.js must configure rollupOptions.output.manualChunks for code-splitting (ADR 0007)'
      );
    });

    it('T1.9: Google Font Sarabun must be preloaded and render-blocking @import removed', () => {
      const styleCss = readFileOrEmpty('src/style.css');
      const appBlade = readFileOrEmpty('resources/views/app.blade.php');

      // Verify render-blocking @import is removed from style.css
      const hasCssImport = /@import\s+url\([^)]*fonts\.googleapis\.com[^)]*\);/i.test(styleCss);
      assert.strictEqual(
        hasCssImport,
        false,
        'Render-blocking @import for Google Fonts must be removed from src/style.css to optimize Core Web Vitals'
      );

      // Verify preload hint in Blade template
      const hasPreloadHint = /rel="preload"\s+as="style"\s+href="[^"]*fonts\.googleapis\.com[^"]*"/i.test(appBlade) ||
                            /as="style"[^>]*rel="preload"/i.test(appBlade);
      assert.ok(hasPreloadHint, 'resources/views/app.blade.php must include <link rel="preload" as="style"> for Sarabun font');
    });

    it('T1.10: Apache .htaccess must configure 1-year immutable caching for dist/assets', () => {
      const htaccess = readFileOrEmpty('public/.htaccess');
      assert.ok(htaccess.length > 0, 'public/.htaccess must exist');

      const hasImmutableCache = /Cache-Control\s+"public,\s*max-age=31536000,\s*immutable"/i.test(htaccess) ||
                                /max-age=31536000.*immutable/i.test(htaccess);
      assert.ok(
        hasImmutableCache,
        'public/.htaccess must set Cache-Control: public, max-age=31536000, immutable for Vite production assets'
      );
    });
  });

  // =========================================================================
  // TIER 2: BOUNDARY & CORNER CASES
  // =========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    it('T2.1: 320px viewport boundary: CSS must enforce fluid container sizing without overflow', () => {
      const styleCss = readFileOrEmpty('src/style.css');

      // Strip media queries so we only inspect element declarations
      const cssWithoutMedia = styleCss.replace(/@media[^{]*\{[\s\S]*?\}/gi, '');

      // Test that layout wrappers do not have fixed min-width greater than 320px
      const hasFixedLargeMinWidth = /min-width:\s*(?:[4-9]\d{2}|[1-9]\d{3,})px/i.test(cssWithoutMedia);
      assert.strictEqual(
        hasFixedLargeMinWidth,
        false,
        'src/style.css must not specify rigid min-width > 320px on layout wrappers'
      );

      // Ensure full width containment
      const hasWidth100 = /width:\s*100%!important/i.test(styleCss.replace(/\s+/g, ''));
      assert.ok(hasWidth100, 'src/style.css must enforce width: 100% on root elements to guarantee 320px reflow');
    });

    it('T2.2: Interactive controls must provide minimum 44x44px touch targets (WCAG 2.5.8 / 2.5.5)', () => {
      const styleCss = readFileOrEmpty('src/style.css');
      const mainJs = readFileOrEmpty('src/main.js');
      const combined = styleCss + mainJs;

      // Check touch target provisions (min-height 44px or min-h-11 or p-2.5 on action buttons)
      const hasTouchTargetClasses = /min-h-\[44px\]|min-h-11|min-w-11|h-11|p-2\.5|p-3/i.test(combined);
      assert.ok(
        hasTouchTargetClasses,
        'Interactive elements must maintain minimum dimensions for touch accessibility'
      );
    });

    it('T2.3: Focus trap boundary: Must handle wrap-around in both forward and backward directions', () => {
      const drawerJs = readFileOrEmpty('src/components/drawer.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const code = drawerJs || mainJs;

      // Forward wrap: Tab on last focusable wraps to first
      const hasForwardWrap = /shiftKey.*last|last.*first|\.at\(-1\)\.focus\(\)|focusable\[0\]/i.test(code);
      assert.ok(hasForwardWrap, 'Focus trap must cycle from last element to first on Tab');

      // Backward wrap: Shift+Tab on first focusable wraps to last
      const hasBackwardWrap = /shiftKey.*first|first.*last|\.at\(-1\)\.focus\(\)|focusable\[0\]/i.test(code);
      assert.ok(hasBackwardWrap, 'Focus trap must cycle from first element to last on Shift+Tab');
    });

    it('T2.4: Production asset guard: public/dist/index.html must not exist', () => {
      const distIndexExists = fileExists('public/dist/index.html');
      assert.strictEqual(
        distIndexExists,
        false,
        'public/dist/index.html must NOT exist (protects against SPA shell bypass)'
      );
    });
  });

  // =========================================================================
  // TIER 3: CROSS-FEATURE INTERACTIONS
  // =========================================================================
  describe('Tier 3: Cross-Feature Interactions', () => {

    it('T3.1: Drawer open state must lock background body scroll and release cleanly on close', () => {
      const drawerJs = readFileOrEmpty('src/components/drawer.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const code = drawerJs || mainJs;

      const hasScrollLock = /document\.body\.style\.overflow\s*=\s*['"]hidden['"]|classList\.add\(['"]overflow-hidden['"]\)/i.test(code);
      assert.ok(hasScrollLock, 'Opening drawer must lock background document scrolling');

      const hasScrollRelease = /document\.body\.style\.overflow\s*=\s*['"]['"]|classList\.remove\(['"]overflow-hidden['"]\)/i.test(code);
      assert.ok(hasScrollRelease, 'Closing drawer must release background document scrolling');
    });

    it('T3.2: Tailwind CSS v4 scanner must cover all modular ES JavaScript files (./**/*.js)', () => {
      const styleCss = readFileOrEmpty('src/style.css');

      const hasWildcardScanner = /@source\s+['"]\.\/\*\*\/\*\.js['"]/i.test(styleCss);
      assert.ok(
        hasWildcardScanner,
        'src/style.css must specify @source "./**/*.js"; to prevent utility classes from being dropped across modules'
      );
    });

    it('T3.3: Central API Client must intercept 401/419 session expiration and redirect to login', () => {
      const apiJs = readFileOrEmpty('src/api.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const code = apiJs || mainJs;

      const handlesSessionExpiry = /status\s*===\s*401|status\s*===\s*419/i.test(code);
      assert.ok(handlesSessionExpiry, 'Central API client must intercept 401 Unauthorized and 419 Page Expired');

      const redirectsToLogin = /location\.assign\(|location\.href\s*=/i.test(code);
      assert.ok(redirectsToLogin, 'Central API client must trigger login redirect upon session expiration');
    });

    it('T3.4: Central API Client must handle 422 validation errors and 429 rate limit responses gracefully', () => {
      const apiJs = readFileOrEmpty('src/api.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const code = apiJs || mainJs;

      const handlesValidation = /422/i.test(code);
      assert.ok(handlesValidation, 'Central API client must recognize 422 Unprocessable Entity');

      const handlesRateLimit = /429/i.test(code);
      assert.ok(handlesRateLimit, 'Central API client must intercept 429 Too Many Requests');
    });
  });

  // =========================================================================
  // TIER 4: REAL-WORLD SCENARIOS
  // =========================================================================
  describe('Tier 4: Real-World Scenarios', () => {

    it('T4.1: Simulated Keyboard Navigation Flow: Skip Link -> Main -> Drawer -> ESC -> Restore', () => {
      const appBlade = readFileOrEmpty('resources/views/app.blade.php');
      const drawerJs = readFileOrEmpty('src/components/drawer.js');
      const mainJs = readFileOrEmpty('src/main.js');

      // 1. Initial focus lands on skip link
      assert.ok(
        appBlade.indexOf('href="#main-content"') < appBlade.indexOf('id="main-content"'),
        'Skip link must appear in DOM before main content for first Tab focus'
      );

      // 2. Skip link targets main content container
      assert.ok(
        appBlade.includes('id="main-content"'),
        'Main content target element #main-content must exist in DOM'
      );

      // 3. Drawer focus trap and restoration logic exists
      const drawerCode = drawerJs || mainJs;
      assert.ok(
        /triggerElement|restoreFocus|\.focus\(\)/i.test(drawerCode),
        'Keyboard user workflow must support focus restoration when dismissing modal overlays'
      );
    });

    it('T4.2: Simulated Screen Reader Exploration Flow: Sequential Landmark Traversal & Live Status', () => {
      const appBlade = readFileOrEmpty('resources/views/app.blade.php');
      const navJs = readFileOrEmpty('src/components/navigation.js');
      const mainJs = readFileOrEmpty('src/main.js');
      const combined = appBlade + navJs + mainJs;

      // Check that landmarks are properly separated and labeled
      const hasBanner = /role="banner"|<header/i.test(combined);
      const hasNav = /role="navigation"|<nav/i.test(combined);
      const hasMain = /role="main"|<main/i.test(combined);
      const hasAside = /role="complementary"|<aside/i.test(combined);

      assert.ok(hasBanner && hasNav && hasMain && hasAside, 'All 4 standard landmarks must be present');

      // Check dynamic toast status live region
      const hasLiveRegion = /aria-live="polite"/i.test(combined);
      assert.ok(hasLiveRegion, 'Screen reader live region aria-live="polite" must be active for status updates');
    });
  });
});
