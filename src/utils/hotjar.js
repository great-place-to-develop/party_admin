/**
 * Hotjar Integration Utility
 *
 * This utility initializes Hotjar tracking for user behavior analysis.
 * Make sure to set VITE_HOTJAR_ID and VITE_HOTJAR_VERSION in your .env file.
 */

export const initializeHotjar = () => {
  const hotjarId = import.meta.env.VITE_HOTJAR_ID;
  const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION || 6;

  // Skip in development or if no Hotjar ID is configured
  if (!hotjarId || import.meta.env.DEV) {
    console.log('Hotjar: Skipping initialization (dev mode or no ID configured)');
    return;
  }

  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:hotjarId,hjsv:hotjarVersion};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

  console.log('Hotjar: Initialized successfully');
};

/**
 * Identify user in Hotjar
 * @param {string} userId - Unique user identifier
 * @param {Object} attributes - Additional user attributes
 */
export const identifyHotjarUser = (userId, attributes = {}) => {
  if (window.hj) {
    window.hj('identify', userId, attributes);
  }
};

/**
 * Trigger a Hotjar event
 * @param {string} eventName - Name of the event
 */
export const triggerHotjarEvent = (eventName) => {
  if (window.hj) {
    window.hj('event', eventName);
  }
};

/**
 * Tag a recording in Hotjar
 * @param {Array<string>} tags - Tags to apply to the recording
 */
export const tagHotjarRecording = (tags) => {
  if (window.hj) {
    window.hj('tagRecording', tags);
  }
};
