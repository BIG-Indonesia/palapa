angular.module('nodeManager').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/')

        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                }
            })
            .state('db_dev', {
                url: '/db_dev',
                templateUrl: 'templates/db_dev.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('db_prod', {
                url: '/db_prod',
                templateUrl: 'templates/db_prod.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('db_pub', {
                url: '/db_pub',
                templateUrl: 'templates/db_pub.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('db_pub_publikasi', {
                url: '/db_pub_publikasi',
                templateUrl: 'templates/db_pub_publikasi.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('db_meta', {
                url: '/db_meta',
                templateUrl: 'templates/db_meta.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('data_to_dev', {
                url: '/data_to_dev',
                templateUrl: 'templates/ctrl_data_to_dev.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('ctrl_dbdev_to_prod', {
                url: '/ctrl_dbdev_to_prod',
                templateUrl: 'templates/ctrl_dbdev_to_prod.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('ctrl_dbprod_to_pub', {
                url: '/ctrl_dbprod_to_pub',
                templateUrl: 'templates/ctrl_dbprod_to_pub.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('state1', {
                url: '/state1',
                templateUrl: 'templates/state1.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('state2', {
                url: '/state2',
                templateUrl: 'templates/state2.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('metadata', {
                url: '/metadata',
                templateUrl: 'templates/metakugi.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('metalinks', {
                url: '/metalinks',
                templateUrl: 'templates/metalinks.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('adminState', {
                url: '/adminState',
                templateUrl: 'templates/adminState.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('logState', {
                url: '/log',
                templateUrl: 'templates/log.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('penggunaState', {
                url: '/pengguna',
                templateUrl: 'templates/pengguna.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('grupState', {
                url: '/grup',
                templateUrl: 'templates/grup.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('sisFront', {
                url: '/sisfront',
                templateUrl: 'templates/sistem_frontend.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('sisFrontCMS', {
                url: '/sisfrontcms',
                templateUrl: 'templates/frontend_cms.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('sistemState', {
                url: '/sistem',
                templateUrl: 'templates/sistem.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('grupFitur', {
                url: '/grupfitur',
                templateUrl: 'templates/grupfitur.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('docs', {
                url: '/docs',
                templateUrl: 'templates/docs.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('keyword', {
                url: '/keyword',
                templateUrl: 'templates/meta_keywords.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('extsrv', {
                url: '/extsrv',
                templateUrl: 'templates/ext_services.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('basemaps', {
                url: '/basemaps',
                templateUrl: 'templates/basemaps.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('photos', {
                url: '/photos',
                templateUrl: 'templates/photos.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('linkweb', {
                url: '/linkweb',
                templateUrl: 'templates/linkweb.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('kontak', {
                url: '/kontak',
                templateUrl: 'templates/kontak.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('berita', {
                url: '/berita',
                templateUrl: 'templates/berita.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
    }
])