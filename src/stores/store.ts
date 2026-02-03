// /**
//  * Root Zustand Store
//  * Combines all slices into a unified store with persistence and devtools
//  */

// import { create } from 'zustand';
// import { devtools, subscribeWithSelector } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';

// import { persist } from './middleware/persistence';
// import { createAppSlice, initializeApp } from './slices/appSlice';
// import { createAuthSlice } from './slices/authSlice';
// import { createParentSlice } from './slices/parentSlice';
// import type { RootStore } from './types';

// // =============================================================================
// // STORE CONFIGURATION
// // =============================================================================

// const STORE_NAME = 'parent-portal-store';
// const STORE_VERSION = 1;

// const isDevelopment = import.meta.env.DEV;
// const enableDevtools = isDevelopment;
// const enablePersistence = true;

// // =============================================================================
// // ROOT STORE CREATION
// // =============================================================================

// export const useStore = create<RootStore>()(
//     devtools(
//         subscribeWithSelector(
//             immer(
//                 persist(
//                     (set, get, api) => ({
//                         // Combine all slices
//                         ...createAuthSlice(set, get, api),
//                         ...createParentSlice(set, get, api),
//                         ...createAppSlice(set, get, api),

//                         // =============================================================
//                         // GLOBAL STORE ACTIONS
//                         // =============================================================

//                         resetAllStores: () => {
//                             set(state => {
//                                 // Reset auth slice
//                                 state.user = null;
//                                 state.session = {
//                                     accessToken: null,
//                                     refreshToken: null,
//                                     expiresAt: null,
//                                     isAuthenticated: false,
//                                     lastActivity: Date.now(),
//                                     tenantAlias: null,
//                                 };
//                                 state.isInitialized = false;
//                                 state.error = null;

//                                 // Reset parent slice
//                                 state.data = {
//                                     students: [],
//                                     selectedStudentId: null,
//                                     lastSync: null,
//                                     cachedData: {
//                                         billings: {},
//                                         timetables: {},
//                                         tellerOperations: {},
//                                     },
//                                 };
//                                 state.isLoading = false;

//                                 // Reset app slice (keep online status and sidebar preferences)
//                                 const currentOnlineStatus = state.app.isOnline;
//                                 const currentSidebarPinned =
//                                     state.app.sidebar.isPinned;

//                                 state.app = {
//                                     isLoading: false,
//                                     isOnline: currentOnlineStatus,
//                                     sidebar: {
//                                         isOpen: false,
//                                         isPinned: currentSidebarPinned,
//                                         width: 280,
//                                     },
//                                     modals: {
//                                         activeModals: new Set(),
//                                         modalData: {},
//                                     },
//                                     notifications: {
//                                         items: [],
//                                         unreadCount: 0,
//                                         lastFetched: null,
//                                     },
//                                     breadcrumbs: [],
//                                     activeStudent: null,
//                                 };
//                             });

//                             // Clear persisted data
//                             get().clearPersistedState?.();
//                         },

//                         getStoreSnapshot: (): Record<string, unknown> => {
//                             const state = get();
//                             return {
//                                 user: state.user,
//                                 session: state.session,
//                                 isInitialized: state.isInitialized,
//                                 data: state.data,
//                                 app: state.app,
//                                 timestamp: Date.now(),
//                             };
//                         },

//                         restoreFromSnapshot: (
//                             snapshot: Record<string, unknown>
//                         ) => {
//                             set(state => {
//                                 // Validate snapshot structure
//                                 if (
//                                     typeof snapshot === 'object' &&
//                                     snapshot !== null &&
//                                     'timestamp' in snapshot
//                                 ) {
//                                     // Only restore if snapshot is recent (within 24 hours)
//                                     const now = Date.now();
//                                     const snapshotAge =
//                                         now - (snapshot.timestamp as number);
//                                     const maxAge = 24 * 60 * 60 * 1000; // 24 hours

//                                     if (snapshotAge <= maxAge) {
//                                         Object.assign(state, snapshot);
//                                     } else {
//                                         console.warn(
//                                             'Snapshot too old, ignoring restore'
//                                         );
//                                     }
//                                 } else {
//                                     console.warn('Invalid snapshot format');
//                                 }
//                             });
//                         },
//                     }),
//                     {
//                         name: STORE_NAME,
//                         version: STORE_VERSION,
//                         whitelist: ['user', 'session', 'app'],
//                         blacklist: ['isLoading', 'error'],
//                         partialize: state => ({
//                             user: state.user,
//                             session: {
//                                 ...state.session,
//                                 // Don't persist the actual tokens for security
//                                 accessToken: null,
//                                 refreshToken: null,
//                             },
//                             app: {
//                                 ...state.app,
//                                 // Don't persist temporary UI state
//                                 isLoading: false,
//                                 modals: {
//                                     activeModals: new Set(),
//                                     modalData: {},
//                                 },
//                                 notifications: {
//                                     items: [],
//                                     unreadCount: 0,
//                                     lastFetched: null,
//                                 },
//                             },
//                         }),
//                         migrate: (persistedState: unknown, version: number) => {
//                             console.log(
//                                 `Migrating store from version ${version}`
//                             );
//                             // Add migration logic here when needed
//                             return persistedState;
//                         },
//                     }
//                 )
//             )
//         ),
//         {
//             enabled: enableDevtools,
//             name: 'parent-portal-store',
//             serialize: true,
//         }
//     )
// );

// // =============================================================================
// // STORE INITIALIZATION
// // =============================================================================

// let isInitialized = false;
// let cleanupFunctions: (() => void)[] = [];

// export const initializeStore = async (): Promise<void> => {
//     if (isInitialized) return;

//     try {
//         console.log('🏪 Initializing Parent Portal Store...');

//         const store = useStore.getState();

//         // Initialize app-level listeners and preferences
//         const appCleanup = initializeApp(useStore.setState);
//         if (appCleanup) {
//             cleanupFunctions.push(appCleanup);
//         }

//         // Initialize authentication state
//         await store.initialize();

//         // Set up store subscriptions for cross-slice updates
//         setupStoreSubscriptions();

//         console.log('✅ Store initialized successfully');
//         isInitialized = true;
//     } catch (error) {
//         console.error('❌ Store initialization failed:', error);
//         throw error;
//     }
// };

// // =============================================================================
// // STORE SUBSCRIPTIONS
// // =============================================================================

// const setupStoreSubscriptions = () => {
//     // Subscribe to authentication changes
//     const unsubscribeAuth = useStore.subscribe(
//         state => state.session.isAuthenticated,
//         (isAuthenticated, previousIsAuthenticated) => {
//             if (previousIsAuthenticated && !isAuthenticated) {
//                 // User logged out - clear sensitive data
//                 const state = useStore.getState();
//                 state.resetAllStores();
//             }
//         }
//     );

//     cleanupFunctions.push(unsubscribeAuth);

//     // Subscribe to selected student changes
//     const unsubscribeStudent = useStore.subscribe(
//         state => state.data.selectedStudentId,
//         selectedStudentId => {
//             // Update app state when student selection changes
//             const state = useStore.getState();
//             if (state.app.activeStudent !== selectedStudentId) {
//                 state.setActiveStudent(selectedStudentId);
//             }
//         }
//     );

//     cleanupFunctions.push(unsubscribeStudent);

//     // Subscribe to online/offline changes
//     const unsubscribeOnline = useStore.subscribe(
//         state => state.app.isOnline,
//         isOnline => {
//             if (!isOnline) {
//                 // User went offline - show notification
//                 const state = useStore.getState();
//                 state.addNotification({
//                     type: 'warning',
//                     title: 'Connection Lost',
//                     message:
//                         'You are currently offline. Some features may be limited.',
//                 });
//             } else {
//                 // User came back online
//                 const state = useStore.getState();
//                 state.addNotification({
//                     type: 'success',
//                     title: 'Connection Restored',
//                     message: 'You are back online.',
//                 });

//                 // Optionally sync data when coming back online
//                 if (state.session.isAuthenticated) {
//                     state.syncData();
//                 }
//             }
//         }
//     );

//     cleanupFunctions.push(unsubscribeOnline);
// };

// // =============================================================================
// // CLEANUP FUNCTION
// // =============================================================================

// export const cleanupStore = (): void => {
//     console.log('🧹 Cleaning up store...');

//     // Run all cleanup functions
//     cleanupFunctions.forEach(cleanup => {
//         try {
//             cleanup();
//         } catch (error) {
//             console.warn('Cleanup function failed:', error);
//         }
//     });

//     cleanupFunctions = [];
//     isInitialized = false;
// };

// // =============================================================================
// // STORE UTILITIES
// // =============================================================================

// export const storeUtils = {
//     /**
//      * Get current store state snapshot
//      */
//     getSnapshot: () => {
//         return useStore.getState().getStoreSnapshot();
//     },

//     /**
//      * Reset the entire store
//      */
//     reset: () => {
//         useStore.getState().resetAllStores();
//     },

//     /**
//      * Check if store is initialized
//      */
//     isInitialized: () => isInitialized,

//     /**
//      * Get store statistics for debugging
//      */
//     getStats: () => {
//         const state = useStore.getState();
//         return {
//             isAuthenticated: state.session.isAuthenticated,
//             hasUser: !!state.user,
//             studentCount: state.data.students.length,
//             selectedStudent: state.data.selectedStudentId,
//             notificationCount: state.app.notifications.items.length,
//             unreadNotifications: state.app.notifications.unreadCount,
//             isOnline: state.app.isOnline,
//             lastSync: state.data.lastSync,
//         };
//     },

//     /**
//      * Force a complete rehydration from persistence
//      */
//     rehydrate: () => {
//         const state = useStore.getState();
//         if ('hydrate' in state && typeof state.hydrate === 'function') {
//             state.hydrate();
//         }
//     },
// };

// // Export store hooks for easier usage
// export default useStore;
