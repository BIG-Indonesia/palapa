// Configure the main application module.
var nodeManager = angular.module('nodeManager', ['ngAnimate', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'openlayers-directive', 'nemLogging', 'ngResource', 'base64', 'angularFileUpload', 'angular.filter', 'treasure-overlay-spinner', 'listGroup', 'ui.select', 'angularUtils.directives.dirPagination', 'angular-loading-bar'])
    /*Constants regarding user login defined here*/
nodeManager.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'member',
        guest: 'guest',
    }).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    }).constant('CONFIG', {
        api_url: baseAPIURL,
        gs_url: baseGSURL
    }).constant('LAYER', {
        preview: '',
        id: '',
        abstract: ''
    })
    /* Adding the auth interceptor here, to check every $http request*/
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })

/* Functions */

function encodeImageFileAsURL(berkas) {
    console.log(berkas)
    var file = berkas[0];
    var reader = new FileReader();
    // reader.onloadend = function() {
    //     return reader.result;
    // }
    reader.readAsDataURL(file);
    setTimeout(() => {
        return reader.result;
    }, 1000);
}

/* End Functions */


nodeManager.controller('SideMenuController', function($scope, CONFIG, $http) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term

    // create the list of sushi rolls 
    $scope.menus = [{
            title: "Database",
            action: "#",
            menus: [{
                    title: "Pengembangan (DEV)",
                    action: "#/db_dev",
                    icons: "fa fa-database",
                    tooltip: "Manajemen dataset di database Pengembangan",
                    level: "member"
                },
                {
                    title: "Produksi (PROD)",
                    action: "#/db_prod",
                    icons: "fa fa-database",
                    tooltip: "Manajemen dataset di database Produksi",
                    level: "member"
                },
                {
                    title: "Publikasi (PUB)",
                    action: "#/db_pub",
                    icons: "fa fa-database",
                    tooltip: "Manajemen dataset di database Publikasi",
                    level: "admin"
                }
            ]
        },
        {
            title: "Publikasi",
            action: "#",
            menus: [{
                    title: "Publikasi Layer KUGI",
                    action: "#/db_pub_publikasi",
                    icons: "fa fa-globe",
                    tooltip: "Publikasi dataset di database Publikasi ke GeoServer",
                    level: "member"
                },
                {
                    title: "Layer Spasial",
                    action: "#/state1",
                    icons: "fa fa-globe",
                    tooltip: "Manajemen Layer GeoServer",
                    level: "member"
                },
                {
                    title: "Metadata KUGI",
                    action: "#/metadata",
                    icons: "fa fa-file-text",
                    tooltip: "Manajemen metadata dengan skema KUGI",
                    level: "member"
                },
                {
                    title: "Metadata Usulan KUGI",
                    action: "#/metalinks",
                    icons: "fa fa-file-text",
                    tooltip: "Manajemen metadata dengan skema Non-KUGI",
                    level: "member"
                },
                {
                    title: "Dokumen Usulan KUGI",
                    action: "#/docs",
                    icons: "fa fa-file-text",
                    tooltip: "Dokumen usulan skema Non-KUGI",
                    level: "member"
                },
                {
                    title: "Berita",
                    action: "#/berita",
                    icons: "fa fa-file-text",
                    tooltip: "Berita",
                    level: "admin"
                }
            ]
        },
        {
            title: "Konfigurasi",
            action: "#",
            menus: [{
                    title: "Sistem",
                    action: "#/sistem",
                    icons: "fa fa-cogs",
                    tooltip: "Konfigurasi sistem",
                    level: "admin"
                },
                {
                    title: "Layer Jelajah",
                    action: "#/sisfront",
                    icons: "fa fa-stack-exchange",
                    tooltip: "Konfigurasi frontend",
                    level: "admin"
                },
                {
                    title: "Front End",
                    action: "#/sisfrontcms",
                    icons: "fa fa-stack-exchange",
                    tooltip: "Konfigurasi frontend",
                    level: "admin"
                },
                {
                    title: "Grup",
                    action: "#/grup",
                    icons: "fa fa-users",
                    tooltip: "Manajemen grup GeoServer",
                    level: "admin"
                },
                {
                    title: "Fitur Grup",
                    action: "#/grupfitur",
                    icons: "fa fa-clone",
                    tooltip: "Fitur Grup",
                    level: "admin"
                },
                {
                    title: "Keyword Metadata",
                    action: "#/keyword",
                    icons: "fa fa-server",
                    tooltip: "Keyword Metadata",
                    level: "admin"
                },
                {
                    title: "External Web Services",
                    action: "#/extsrv",
                    icons: "fa fa-globe",
                    tooltip: "External Web Services",
                    level: "admin"
                },
                {
                    title: "Basemaps",
                    action: "#/basemaps",
                    icons: "fa fa-globe",
                    tooltip: "Basemap Services",
                    level: "admin"
                },
                {
                    title: "Foto",
                    action: "#/photos",
                    icons: "fa fa-globe",
                    tooltip: "Foto",
                    level: "member"
                },
                {
                    title: "Pengguna",
                    action: "#/pengguna",
                    icons: "fa fa-user",
                    tooltip: "Manajemen pengguna GeoServer",
                    level: "member"
                },
                {
                    title: "Style (SLD)",
                    action: "#/state2",
                    icons: "fa fa-paint-brush",
                    tooltip: "Manajemen Style GeoServer",
                    level: "member"
                },
                {
                    title: "Link Web",
                    action: "#/linkweb",
                    icons: "fa fa-paint-brush",
                    tooltip: "Manajemen Link Web",
                    level: "admin"
                },
                {
                    title: "Kontak Masuk",
                    action: "#/kontak",
                    icons: "fa fa-paint-brush",
                    tooltip: "Kontak Masuk",
                    level: "admin"
                },
            ]
        }
    ]
});


nodeManager.controller('LayersCtrl', function($rootScope, $scope, CONFIG, LAYER, $window, $http, $base64, $upload, $timeout, $state, $stateParams, olData, USER_ROLES) {
    $scope.sortType = 'last_modified'; // set the default sort type
    $scope.sortReverse = true; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term

    $scope.upload = [];
    $scope.progress = 0;
    $scope.response = '';
    $scope.init = $rootScope.currentUser;
    console.log($scope.init)
    $scope.uploadxml = false;
    $scope.minimalmeta = true;


    //metadata lengkap

           // $scope.sisteminfo = {};

            $scope.lengkapmeta = false;
            var params = {};

            $scope.today = new Date();
            console.log($scope.today);
            


             $http.get(CONFIG.api_url + 'sisteminfo').success(function (data) {

                  


                    $scope.sisteminfo = data ;
                    $scope.dataSetURI = $scope.sisteminfo.url;
                    $scope.Distributor_individualName = $scope.sisteminfo.organization;
                    $scope.Distributor_organisationName = $scope.sisteminfo.organization;
                    $scope.Distributor_positionName = $scope.sisteminfo.organization;
                    $scope.Distributor_phone = $scope.sisteminfo.phone;
                    $scope.Distributor_facsimile = $scope.sisteminfo.fax;
                    $scope.Distributor_deliveryPoint = $scope.sisteminfo.address;
                    $scope.Distributor_city = $scope.sisteminfo.city;
                    $scope.Distributor_postalCode = $scope.sisteminfo.postalcode;
                    $scope.Distributor_country = $scope.sisteminfo.country;
                    $scope.Distributor_electronicMailAddress = $scope.sisteminfo.email;
                    $scope.Distributor_hoursOfService = $scope.sisteminfo.hoursofservice;
                    $scope.Distributor_contactInstructions = $scope.sisteminfo.contactinstruction;

                    console.log($scope.sisteminfo);
                   

             });


             $http.get(CONFIG.api_url + 'group/' + 'ADMIN').success(function (data) {

                        $scope.groupinfo = data[0] ;

                        console.log($scope.groupinfo);
                        console.log($scope.groupinfo.organization);
                       
                        $scope.individualName = $scope.groupinfo.organization;
                        $scope.organisationName = $scope.groupinfo.organization;
                        $scope.positionName = $scope.groupinfo.organization;
                        $scope.phone = $scope.groupinfo.phone;
                        $scope.facsimile = $scope.groupinfo.fax;
                        $scope.deliveryPoint = $scope.groupinfo.address;
                        $scope.city = $scope.groupinfo.city;
                        $scope.postalCode = $scope.groupinfo.postalcode;
                        $scope.country = $scope.groupinfo.country;
                        $scope.electronicMailAddress = $scope.groupinfo.email;
                        
                        
                      


             });   

             

              //$scope.dataSetURI = 'www.big.go.id'; 






    //metadata lengkap 





    $scope.keywords = [];

    $scope.theuser = $rootScope.currentUser['user']
    $scope.curwrk = $rootScope.currentUser['grup']
    $scope.curgrup = $rootScope.currentUser['kelas']
    $scope.cekgrup = function(user) {
        if ($scope.curgrup == 'admin' || user == $scope.curwrk) {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekadmin = function() {
        if ($scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekuser = function(user) {
        if ($scope.theuser == user || $scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $http.get(CONFIG.api_url + 'kodeepsg', { cache: true }).success(function(data) {
        $scope.kodeepsg = data;
    });

    $scope.selectedsimpul = [];

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });


    $http.get(CONFIG.api_url + 'keyword/list', { cache: false }).success(function(data) {
        $scope.keywords = data;
    });

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    angular.extend($scope, {
        center: previewCenter,
        defaults: {
            layers: [{
                main: {
                    source: {
                        type: 'OSM',
                        url: baseXYZLayer
                    }
                }
            }],
            interactions: {
                mouseWheelZoom: true
            },
            controls: {
                zoom: true,
                rotate: true,
                attribution: false
            }
        }
    });

    angular.extend($scope, {
        wms: {
            source: {
                type: 'ImageWMS',
                url: CONFIG.gs_url,
                params: {}
            }
        }
    });

    $scope.updatemap = function(layer) {
        setTimeout(function() {
                $scope.$apply(function() {
                    $scope.wms.source.params.LAYERS = layer
                });
            })
            // $scope.wms.source.params.LAYERS = layer
            // olData.
    };
    // $scope.$watch($scope.wms.source.params.LAYERS, function () {
    //     console.log($scope.wms.source.params.LAYERS)
    // });

    // $scope.$watch("offset", function (offset) {
    //     $scope.center.bounds[0] += parseFloat(offset, 10);
    //     $scope.center.bounds[1] += parseFloat(offset, 10);
    //     $scope.center.bounds[2] -= parseFloat(offset, 10);
    //     $scope.center.bounds[3] -= parseFloat(offset, 10);
    // });


    // $scope.model.layer.layer_abstract = '';

    // $scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };
    $scope.FileSelect = function($files) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                var params = {}
                params.USER = $rootScope.currentUser['user']
                params.GRUP = $rootScope.currentUser['grup']
                params.KODESIMPUL = $rootScope.kodesimpul
                var dataparam = $.param({
                    json: JSON.stringify({
                        pubdata: params
                    })
                });
                console.log(params)
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'upload', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: params
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    angular.element(document.getElementById('eWNext'))[0].disabled = false;
                    bootbox.alert($scope.response.MSG)
                        // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    angular.element(document.getElementById('eWNext'))[0].disabled = true;
                    bootbox.alert($scope.response.MSG)
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.linkntry = {}
    $scope.linkntry.name = ''
    $scope.linkntry.enabled = ''
    $scope.linkntry.akses = ''
    $scope.linkntry.id = ''
    $scope.styles = '';

    $scope.MetaFileSelect = function($files, identifier, akses) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'meta/link', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: {
                        identifier: identifier,
                        akses: akses
                    }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG)
                        // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG)
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.BerkasSelect = function($files, identifier) {
        console.log($files, identifier);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload_docs[index] = $upload.upload({
                    url: CONFIG.api_url + 'docs/link', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: {
                        identifier: identifier
                    }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress_docs = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.safeApply(function() {
                        $scope.bresponse = data;
                    });
                    bootbox.alert($scope.bresponse.MSG)
                        // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.bresponse = data;
                    bootbox.alert($scope.bresponse.MSG);
                    console.log(data);
                });
            })(i);
        }
    }

    // $scope.minmeta = function(bool) {
    //     if (bool == true) {
    //         $scope.uploadxml = false;
    //         $scope.minimalmeta = true;
    //     } else {
    //         $scope.uploadxml = true;
    //         $scope.minimalmeta = false;
    //     }
    // }


     //metadata lengkap
    
    $scope.value = '1';
    $scope.$watch('value', function (value) {
        if (value == '1') {
            $scope.minimalmeta = true;
            $scope.uploadxml = false;
            $scope.lengkapmeta = false;

        } else if (value == '2') {
            $scope.minimalmeta = false;
            $scope.uploadxml = true;
            $scope.lengkapmeta = false;
        } else {
            $scope.minimalmeta = false;
            $scope.uploadxml = false;
            $scope.lengkapmeta = true;
        }
    });

    //metadata lengkap   

    $scope.ingeoserver = false;
    $scope.inmetadata = false;
    // $scope.custoinfo = '';
    // $scope.sisinfo = '';
    $http.get(CONFIG.api_url + 'group/' + $scope.curwrk, { cache: true }).success(function(data) {
        $scope.custoinfo = data;
    });
    $http.get(CONFIG.api_url + 'sisteminfo', { cache: true }).success(function(data) {
        $scope.sisinfo = data;
    });
    // $scope.metaFile = '';

    // $scope.$watch('metaFile', function(metaFile) {
    //     $scope.metaFile = metaFile;
    // });

    $scope.uploadMeta = function(file) {
        $scope.metaFile = file;
        console.log($scope.metaFile);
    }

    $scope.uploadDoc = function(file) {
        $scope.docFile = file;
        console.log($scope.docFile);
    }


    $scope.govsimpul = []

    $scope.MetaUp = function(id, title, abstract, akses, keyword) {
        console.log($scope.metaFile);
        console.log($scope.docFile);
        console.log($scope.curwrk);
        console.log($scope.custoinfo);
        console.log($scope.sisinfo);
        console.log(id);
        console.log(title);
        console.log(abstract);
        console.log(akses);
        console.log(keyword);
        console.log($scope.selectedsimpul.selected);
        if (typeof abstract == 'undefined' || abstract == 'undefined') {
            abstract == title
        }
        parameters = {};
        parameters.ID = id;
        parameters.KEYWORD = encodeURIComponent(keyword.keyword);
        try {
            if (typeof $scope.model.layer.layer_name == 'undefined') {
                parameters.TITLE = encodeURIComponent(title);
            } else {
                parameters.TITLE = encodeURIComponent($scope.model.layer.layer_name);
            }
        } catch (err) {
            parameters.TITLE = encodeURIComponent(title);
        }

        // parameters.TITLE = title;
        try {
            if (typeof abstract == 'undefined') {
                parameters.ABSTRACT = encodeURIComponent(title);
            } else {
                parameters.ABSTRACT = encodeURIComponent(abstract);
            }
        } catch (error) {
            // parameters.ABSTRACT = encodeURIComponent(abstract);

        }
        // parameters.ABSTRACT = encodeURIComponent(abstract);
        parameters.WORKSPACE = $scope.curwrk;
        if (typeof $scope.selectedsimpul.selected != 'undefined' && akses == 'GOVERNMENT') {
            parameters.AKSES = akses + ':';
            for (o = 0, leno = $scope.selectedsimpul.selected.length; o < leno; o++) {
                $scope.govsimpul[o] = $scope.selectedsimpul.selected[o].split(',')[0];
                parameters.AKSES = parameters.AKSES + $scope.selectedsimpul.selected[o].split(',')[0] + ',';
            };
            if (parameters.AKSES == 'GOVERNMENT:') { parameters.AKSES = 'GOVERNMENT' };
        } else {
            parameters.AKSES = akses;
        }
        parameters.SELECTEDSIMPUL = $scope.govsimpul;
        

              //console.log(parameters);

        console.log($scope.tanggal.toString());

        var tanggal2 = ($scope.tanggal.toString()); 

        console.log((tanggal2.split('GMT')[0]).trim());

      

        parameters.tanggal = encodeURIComponent((tanggal2.split('GMT')[0]).trim());
        



        console.log(parameters);







        var data = $.param({
            json: JSON.stringify({
                pubdata: parameters
            })
        });
        



        if ($scope.minimalmeta == true) {
            $http.post(CONFIG.api_url + 'minmetadata', data).success(function (data, status) {
                pesan = data;
                console.log(pesan);
                bootbox.alert(pesan.MSG);
            });
            angular.element(document.getElementById('eWFin'))[0].disabled = false;
            try {
                $scope.BerkasSelect($scope.docFile, id);
            } catch (err) {
                //
            }

        } else if ($scope.uploadxml == true) {
            $scope.MetaFileSelect($scope.metaFile, id, akses);
            angular.element(document.getElementById('eWFin'))[0].disabled = false;
            $scope.BerkasSelect($scope.docFile, id);
        } else if ($scope.lengkapmeta == true) {
           //metadata lengkap

            // parameters.metadataStandardName = encodeURIComponent($scope.metadataStandardName);
            // parameters.metadataStandardVersion = encodeURIComponent($scope.metadataStandardVersion);
            // parameters.datestamp = encodeURIComponent($scope.datestamp);

            //parameters.dataSetURI = encodeURIComponent($scope.tanggal);
            parameters.dataSetURI = encodeURIComponent($scope.dataSetURI);

            // //Contac
            parameters.individualName = encodeURIComponent($scope.individualName);
            parameters.organisationName = encodeURIComponent($scope.organisationName);
            parameters.positionName = encodeURIComponent($scope.positionName);
            parameters.phone = encodeURIComponent($scope.phone);
            parameters.facsimile = encodeURIComponent($scope.facsimile);
            parameters.deliveryPoint = encodeURIComponent($scope.deliveryPoint);
            parameters.city = encodeURIComponent($scope.city);
            parameters.postalCode = encodeURIComponent($scope.postalCode);
            parameters.country = encodeURIComponent($scope.country);
            parameters.electronicMailAddress = encodeURIComponent($scope.electronicMailAddress);
            parameters.linkage = encodeURIComponent($scope.linkage);
            // parameters.protocol = encodeURIComponent($scope.protocol);
            // parameters.function = encodeURIComponent($scope.function);
            parameters.hoursOfService = encodeURIComponent($scope.hoursOfService);
            parameters.contactInstructions = encodeURIComponent($scope.contactInstructions);
            // parameters.rolecontact = encodeURIComponent($scope.rolecontact);

            // //SpatialRepresentationinfo
            // parameters.topologiLevel = encodeURIComponent($scope.topologiLevel);
            // parameters.geometriObjects = encodeURIComponent($scope.geometriObjects);

            // //ReferenceSystemInfo
            // parameters.title_refsystem = encodeURIComponent($scope.title_refsystem);
            // parameters.date_refsystem = encodeURIComponent($scope.date_refsystem);
            // parameters.dateType_refsystem = encodeURIComponent($scope.dateType_refsystem);
            // parameters.organisationName_refsystem = encodeURIComponent($scope.organisationName_refsystem);
            // parameters.linkage_refsystem = encodeURIComponent($scope.linkage_refsystem);
            // parameters.role_refsystem = encodeURIComponent($scope.role_refsystem);
            // parameters.code_refsystem = encodeURIComponent($scope.code_refsystem);
            // parameters.version_refsystem = encodeURIComponent($scope.version_refsystem);

            // //Identification Info
            parameters.title_identification = encodeURIComponent($scope.title_identification);
            // parameters.date_identification = encodeURIComponent($scope.date_identification);
            // parameters.dateType_identification = encodeURIComponent($scope.dateType_identification);
            // parameters.abstract_identification=encodeURIComponent($scope.abstract_identification);
            // parameters.resourceMaintenance_identification = encodeURIComponent($scope.resourceMaintenance_identification);
            // parameters.descriptiveKeywords_identification = encodeURIComponent($scope.descriptiveKeywords_identification);
            // parameters.resourceConstraints_identification = encodeURIComponent($scope.resourceConstraints_identification);
            // parameters.spatialRepresentationType_identification = encodeURIComponent($scope.spatialRepresentationType_identification);
            // parameters.language_identification = encodeURIComponent($scope.language_identification);
            // parameters.CharacterSetCode_identification = encodeURIComponent($scope.CharacterSetCode_identification);
            // parameters.topicCategory_identification=encodeURIComponent($scope.topicCategory_identification);
            
            // // parameters.westBoundLongitude_identification=encodeURIComponent($scope.westBoundLongitude_identification);
            // // parameters.eastBoundLongitude_identification=encodeURIComponent($scope.eastBoundLongitude_identification);
            // // parameters.southBoundLatitude_identification=encodeURIComponent($scope.southBoundLatitude_identification);
            // // parameters.northBoundLatitude_identification=encodeURIComponent($scope.northBoundLatitude_identification);

            // //distributionInfo
            // //Distributor
            parameters.Distributor_individualName = encodeURIComponent($scope.Distributor_individualName);
            parameters.Distributor_organisationName = encodeURIComponent($scope.Distributor_organisationName);
            parameters.Distributor_positionName = encodeURIComponent($scope.Distributor_positionName);
            parameters.Distributor_phone = encodeURIComponent($scope.Distributor_phone);
            parameters.Distributor_facsimile = encodeURIComponent($scope.Distributor_facsimile);
            parameters.Distributor_deliveryPoint = encodeURIComponent($scope.Distributor_deliveryPoint);
            parameters.Distributor_city = encodeURIComponent($scope.Distributor_city);
            parameters.Distributor_postalCode = encodeURIComponent($scope.Distributor_postalCode);
            parameters.Distributor_country = encodeURIComponent($scope.Distributor_country);
            parameters.Distributor_electronicMailAddress = encodeURIComponent($scope.Distributor_electronicMailAddress);
            // parameters.Distributor_linkage = encodeURIComponent($scope.Distributor_linkage);
            // parameters.Distributor_protocol = encodeURIComponent($scope.Distributor_protocol);
            // parameters.Distributor_function = encodeURIComponent($scope.Distributor_function);
            parameters.Distributor_hoursOfService = encodeURIComponent($scope.Distributor_hoursOfService);
            parameters.Distributor_contactInstructions = encodeURIComponent($scope.Distributor_contactInstructions);
            // parameters.Distributor_role = encodeURIComponent($scope.Distributor_role);

            // //wfs
            // parameters.wfs_linkage = encodeURIComponent($scope.wfs_linkage);
            // parameters.wfs_protocol = encodeURIComponent($scope.wfs_protocol);
            // parameters.wfs_name = encodeURIComponent($scope.wfs_name);
            // parameters.wfs_description = encodeURIComponent($scope.wfs_description);
            // parameters.wfs_function = encodeURIComponent($scope.wfs_function);

            // //wms
            // parameters.wms_linkage = encodeURIComponent($scope.wms_linkage);
            // parameters.wms_protocol = encodeURIComponent($scope.wms_protocol);
            // parameters.wms_name = encodeURIComponent($scope.wms_name);
            // parameters.wms_description = encodeURIComponent($scope.wms_description);
            // parameters.wms_function = encodeURIComponent($scope.wms_function);

            // //zip
            // parameters.zip_linkage = encodeURIComponent($scope.zip_linkage);
            // parameters.zip_protocol = encodeURIComponent($scope.zip_protocol);
            // parameters.zip_name = encodeURIComponent($scope.zip_name);
            // parameters.zip_description = encodeURIComponent($scope.zip_description);
            // parameters.zip_function = encodeURIComponent($scope.zip_function);

            // //img
            // parameters.img_linkage = encodeURIComponent($scope.img_linkage);
            // parameters.img_protocol = encodeURIComponent($scope.img_protocol);
            // parameters.img_name = encodeURIComponent($scope.img_name);
            // parameters.img_description = encodeURIComponent($scope.img_description);
            // parameters.img_function = encodeURIComponent($scope.img_function);

            // //MetadataMaintenance
            // parameters.maintenanceAndUpdateFrequency = encodeURIComponent($scope.maintenanceAndUpdateFrequency);
            // parameters.maintenanceNote = encodeURIComponent($scope.maintenanceNote);

            // //MetadataConstrains
            // parameters.classification = encodeURIComponent($scope.classification);
            // parameters.usernote = encodeURIComponent($scope.usernote);

        


           


            console.log(parameters)

            var data = $.param({
                    json: JSON.stringify({
                        pubdata: parameters
                    })
            });


            console.log(data);

            $http.post(CONFIG.api_url + 'lengkapmetadata', data).success(function (data, status) {
                pesan = data;
                console.log(pesan);
                bootbox.alert(pesan.MSG);
            });
            
            angular.element(document.getElementById('eWFin'))[0].disabled = false;
            try {
                $scope.BerkasSelect($scope.docFile, id);
            } catch (err) {
                //
            }


        }

        console.log(params);
    }

    $scope.publish = function() {
        params = $scope.response;
        console.log(params);
        try {
            params.ABS = encodeURIComponent($scope.model.layer.layer_abstract);
            if (typeof $scope.model.layer.layer_name == 'undefined') {
                params.ID = encodeURIComponent(params.ID);
            } else {
                params.ID = encodeURIComponent($scope.model.layer.layer_name);
            }

        } catch (e) {
            params.ABS = '';
            //params.ID = encodeURIComponent($scope.model.layer.layer_name);
        }
        params.USER = $rootScope.currentUser['user']
        params.GRUP = $rootScope.currentUser['grup']
            // params = params.concat($scope.model.layer.layer_abstract);
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'publish', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            $scope.ingeoserver = true
            console.log($scope.response.ID);
            // console.log($scope.model.layer.layer_name);
            if (typeof $scope.response.ID == 'undefined') {
                $scope.linkntry.id = encodeURIComponent("Ganti teks judul ini.");
            } else {
                $scope.linkntry.id = encodeURIComponent($scope.response.ID);
            }
            console.log(pesan);
        })
    }

    $scope.hapusGSLayer = function() {
        var params = {
                layer: $scope.model.layer.layer_id,
                workspace: $scope.model.layer.workspace
            }
            // console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'layers/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // console.log($scope.test);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.editGSLayer = function() {
        var params = {
            id: $scope.model.layer.layer_id,
            title: encodeURIComponent($scope.model.layer.layer_name),
            abstract: encodeURIComponent($scope.model.layer.layer_abstract),
            aktif: $scope.model.layer.layer_aktif,
            style: $scope.model.selectedstyle,
            nativename: $scope.model.layer.layer_nativename,
            tipe: $scope.model.layer.layer_type
        };
        console.log(params);
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'layers/modify', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // console.log($scope.test);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.advGSLayer = function() {
        var params = {
            id: $scope.model.layer.layer_id,
            title: encodeURIComponent($scope.model.layer.layer_name),
            abstract: encodeURIComponent($scope.model.layer.layer_abstract),
            aktif: $scope.model.layer.layer_aktif,
            advertised: $scope.model.layer.layer_advertised,
            style: $scope.model.layer.layer_style,
            nativename: $scope.model.layer.layer_nativename,
            tipe: $scope.model.layer.layer_type
        };
        console.log(params);
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'layer/adv', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // console.log($scope.test);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.abortUpload = function(index) {
        $scope.upload[index].abort();
    }

    var InfoLayerDialogModel = function() {
        this.visible = false;
    };

    InfoLayerDialogModel.prototype.open = function(layer) {
        this.layer = layer;
        this.gs_url = CONFIG.gs_url;
        console.log(layer.layer_nativename)
        nativename = layer.layer_nativename
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.wms.source.params.LAYERS = nativename
                    // $scope.center.bounds[0] = layer.layer_minx
                    // $scope.center.bounds[1] = layer.layer_miny
                    // $scope.center.bounds[2] = layer.layer_maxx
                    // $scope.center.bounds[3] = layer.layer_maxy
            });
        })
        var extent = []
        var lon, lat, zoom = 0
            // wmscenter = function () {
            //     map.getMap().then(function (map) {
            //         extent[0] = layer.layer_minx
            //         extent[1] = layer.layer_miny
            //         extent[2] = layer.layer_maxx
            //         extent[3] = layer.layer_maxy
            //         map.getView().fit(extent, map.getSize());
            //         console.log(map.getView().getCenter())
            //         lon = map.getView().getCenter()[0];
            //         lat = map.getView().getCenter()[1];
            //         zoom = map.getView().getZoom();
            //     });
            // };
            // wmscenter()
            // console.log(extent, lon, lat, zoom)
        this.center = $scope.center;
        this.wms = $scope.wms;
        layer.preview = true
        layer.wmslayer = true
        this.visible = true;
    };

    InfoLayerDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditLayerDialogModel = function() {
        this.visible = false;
    };

    EditLayerDialogModel.prototype.open = function(layer) {
        this.layer = layer;
        this.gs_url = CONFIG.gs_url;
        this.jstyles = $scope.styles;
        nativename = layer.layer_nativename
        this.selectedstyle = { value: this.layer.layer_style }
        console.log(this.jstyles)
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.wms.source.params.LAYERS = nativename
                    // $scope.center.bounds[0] = layer.layer_minx
                    // $scope.center.bounds[1] = layer.layer_miny
                    // $scope.center.bounds[2] = layer.layer_maxx
                    // $scope.center.bounds[3] = layer.layer_maxy
            });
        })
        var extent = []
        var lon, lat, zoom = 0
            // wmscenter = function () {
            //     map.getMap().then(function (map) {
            //         extent[0] = layer.layer_minx
            //         extent[1] = layer.layer_miny
            //         extent[2] = layer.layer_maxx
            //         extent[3] = layer.layer_maxy
            //         map.getView().fit(extent, map.getSize());
            //         console.log(map.getView().getCenter())
            //         lon = map.getView().getCenter()[0];
            //         lat = map.getView().getCenter()[1];
            //         zoom = map.getView().getZoom();
            //     });
            // };
            // wmscenter()
            // console.log(extent, lon, lat, zoom)
        this.center = $scope.center;
        this.wms = $scope.wms;
        layer.preview = true
        layer.wmslayer = true
        this.visible = true;
    };

    EditLayerDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusLayerDialogModel = function() {
        this.visible = false;
    };

    HapusLayerDialogModel.prototype.open = function(layer) {
        this.layer = layer;
        console.log(layer);
        this.visible = true;
    };

    HapusLayerDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var AdvLayerDialogModel = function() {
        this.visible = false;
    };

    AdvLayerDialogModel.prototype.open = function(layer) {
        this.layer = layer;
        console.log(layer);
        this.visible = true;
    };

    AdvLayerDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.getLayer = function(layer) {
        //alert('Layer Name: ' + layer.layer_name);
        // if you're just using a variable in this function, declare it locally
        var layer_title = layer.layer_name;
        var layer_name = layer.layer_id;
        $http.get(CONFIG.api_url + 'layers/info/' + $base64.encode(layer.layer_resource))
            .success(function(data) {
                $scope.res = data;
                //console.log($scope.res);
            });
        //console.log(CONFIG.api_url + 'layers/info/' + layer.layer_resource)
        //console.log(layer_name + ' : ' + layer_title);
    };

    $scope.infoLayer = new InfoLayerDialogModel();
    $scope.editLayer = new EditLayerDialogModel();
    $scope.hapusLayer = new HapusLayerDialogModel();
    $scope.advLayer = new AdvLayerDialogModel();

    $scope.cekowner = function(workspace, grup, user) {
        if (workspace == grup || user == 'palapa') {
            return false;
        } else {
            return true;
        }
    };

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.layers = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'getWMSlayers').success(function(data) {
        $scope.layers = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.layers.length / $scope.pageSize);
        }
    });

    $http.get(CONFIG.api_url + 'getstyles').success(function(data) {
        ustyles = data;
        nstyles = [];
        for (var i = 0; i < ustyles.length; i++) {
            // jstyles[i] = ustyles[i].name;
            // nstyles[i]['value'] = ustyles[i].name;
            nstyles.push({ 'value': ustyles[i].name, 'text': ustyles[i].name });
            // nstyles[i] = { 'value': ustyles[i].name, 'text': ustyles[i].name }
            // console.log("PAIR " + i + ": " + ustyles[i].name);
        };
        // console.log(jstyles);
        // $scope.styles = jstyles.sort();
        $scope.styles = nstyles;
        // console.log(jstyles);
    });

});

nodeManager.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

nodeManager.directive('layerInfoDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes, timeout) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                    scope.model.render = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/layer_info.html'
    };
}]);

nodeManager.directive('layerEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                    scope.model.render = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/layer_edit.html'
    };
}]);

nodeManager.directive('layerHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/layer_hapus.html'
    };
}]);

nodeManager.directive('layerAdvDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/layer_adv.html'
    };
}]);

nodeManager.controller('StylesCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariStyles = ''; // set the default search/filter term

    $scope.upload = [];
    $scope.progress = 0;
    $scope.response = '';

    $scope.reloadView = function() {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
        // create the list of sushi rolls

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.styles = [];

    $http.get(CONFIG.api_url + 'getstyles', { cache: true }).success(function(data) {
        $scope.styles = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.styles.length / $scope.pageSize);
        }
    });

    var HapusStyleDialogModel = function() {
        this.visible = false;
    };

    HapusStyleDialogModel.prototype.open = function(style) {
        this.style = style;
        // console.log(style);
        this.visible = true;
    };

    HapusStyleDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.hapusGSStyle = function() {
        var params = $scope.model.style.name;
        // console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'styles/delete', data).success(function(data, status) {
            $scope.test = data;
            // console.log($scope.test);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.hapusStyle = new HapusStyleDialogModel();

    $scope.FileSelect = function($files) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'styles/add', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    console.log(data);
                });
            })(i);
        }
    }
});

nodeManager.directive('styleHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/style_hapus.html'
    };
}]);

nodeManager.controller('LogCtrl', function($scope, CONFIG, $http, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term

    // create the list of sushi rolls 
    $scope.sushi = [
        { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
        { name: 'Philly', fish: 'Tuna', tastiness: 4 },
        { name: 'Tiger', fish: 'Eel', tastiness: 7 },
        { name: 'Rainbow', fish: 'Variety', tastiness: 6 },
        { name: 'Squidward', fish: 'Squid', tastiness: 2 },
        { name: 'Spongebob', fish: 'Sponge', tastiness: 4 },
        { name: 'Patrick', fish: 'Star', tastiness: 7 },
        { name: 'Batman', fish: 'Ben Affleck', tastiness: 1 }
    ];
});

nodeManager.controller('PenggunaCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    $scope.theuser = $rootScope.currentUser['user']
    console.log($scope.theuser)

    $scope.theuser = $rootScope.currentUser['user']
    $scope.curwrk = $rootScope.currentUser['grup']
    $scope.curgrup = $rootScope.currentUser['kelas']
    $scope.cekgrup = function(user) {
        if ($scope.curgrup == 'admin' || user == $scope.curwrk) {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekadmin = function() {
        if ($scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekuser = function(user) {
        if ($scope.theuser == user || $scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    var HapusPenggunaDialogModel = function() {
        this.visible = false;
    };

    HapusPenggunaDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusPenggunaDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditPenggunaDialogModel = function() {
        this.visible = false;
    };

    EditPenggunaDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        this.selectedgrup = { value: this.item.groupname }
        console.log(this.selectedgrup);
    };

    EditPenggunaDialogModel.prototype.close = function() {
        this.visible = false;
        $scope.reloadView();
    };

    $scope.hapusPengguna = new HapusPenggunaDialogModel();
    $scope.editPengguna = new EditPenggunaDialogModel();
    $scope.penggunaentry = {}
    $scope.penggunaentry.name = ''
    $scope.penggunaentry.password = ''
    $scope.penggunaentry.grup = ''
    $scope.penggunaentry.kelas = ''
    $scope.penggunaentry.enabled = ''
    $scope.penggunaentry.individualname = ''
    $scope.penggunaentry.currentUser = $rootScope.currentUser['user']

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pengguna = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'userswgroup/list').success(function(data) {
        $scope.pengguna = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.pengguna.length / $scope.pageSize);
        }
    });

    $http.get(CONFIG.api_url + 'role/list').success(function(data) {
        temp = {};
        for (x in data) { temp[x] = data[x].name }
        $scope.roles = temp;
    });

    $http.get(CONFIG.api_url + 'group/list').success(function(data) {
        ugrup = data;
        ngrup = [];
        for (var i = 0; i < ugrup.length; i++) {
            // jstyles[i] = ustyles[i].name;
            // nstyles[i]['value'] = ustyles[i].name;
            ngrup.push({ 'value': ugrup[i].name, 'text': ugrup[i].name });
            // nstyles[i] = { 'value': ustyles[i].name, 'text': ustyles[i].name }
            // console.log("PAIR " + i + ": " + ustyles[i].name);
        };
        // console.log(jstyles);
        // $scope.styles = jstyles.sort();
        $scope.grup = ngrup;
        // console.log(ngrup);
    });

    // $http.get(CONFIG.api_url + 'group/list').success(function(data) {
    //     temp = {};
    //     for (x in data) { temp[x] = data[x].name }
    //     $scope.grup = temp;
    //     console.log($scope.grup)
    // });

    $scope.tambahGSPengguna = function() {
        var params = $scope.penggunaentry;
        params.individualname = encodeURIComponent(params.individualname)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'users', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSPengguna = function(grup) {
        var params = $scope.model.item;
        params.groupname = grup
        params.individualname = encodeURIComponent(params.individualname)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'user/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        });
    }

    $scope.hapusGSPengguna = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'user/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

});

nodeManager.directive('penggunaHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/pengguna_hapus.html'
    };
}]);

nodeManager.directive('penggunaEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/pengguna_edit.html'
    };
}]);

nodeManager.controller('GrupCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.grup = [];

    $http.get(CONFIG.api_url + 'group/list').success(function(data) {
        $scope.grup = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.grup.length / $scope.pageSize);
        }
    });

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    var HapusGrupDialogModel = function() {
        this.visible = false;
    };

    HapusGrupDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusGrupDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditGrupDialogModel = function() {
        this.visible = false;
    };

    EditGrupDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EditGrupDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoGrupDialogModel = function() {
        this.visible = false;
    };

    InfoGrupDialogModel.prototype.open = function(item) {
        this.item = item;
        this.visible = true;
        console.log(item);
    };

    InfoGrupDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.infoGrup = new InfoGrupDialogModel();
    $scope.hapusGrup = new HapusGrupDialogModel();
    $scope.editGrup = new EditGrupDialogModel();
    $scope.grupentry = {}
    $scope.grupentry.name = ''
    $scope.grupentry.enabled = ''
    $scope.grupentry.organization = ''
    $scope.grupentry.url = ''
    $scope.grupentry.phone = ''
    $scope.grupentry.fax = ''
    $scope.grupentry.address = ''
    $scope.grupentry.city = ''
    $scope.grupentry.administrativearea = ''
    $scope.grupentry.postalcode = ''
    $scope.grupentry.email = ''
    $scope.grupentry.kodesimpul = ''

    $scope.tambahGSGrup = function() {
        var params = $scope.grupentry;
        params.name = encodeURIComponent(params.name)
        params.organization = encodeURIComponent(params.organization)
        params.address = encodeURIComponent(params.address)
        params.city = encodeURIComponent(params.city)
        params.administrativearea = encodeURIComponent(params.administrativearea)
        params.kodesimpul = encodeURIComponent(params.kodesimpul)
        params.logo = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'groups', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSGrup = function(item) {
        var params = item;
        params.name = encodeURIComponent(params.name)
        params.organization = encodeURIComponent(params.organization)
        params.address = encodeURIComponent(params.address)
        params.city = encodeURIComponent(params.city)
        params.administrativearea = encodeURIComponent(params.administrativearea)
        params.kodesimpul = encodeURIComponent(params.kodesimpul)
        params.logo = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'group/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSGrup = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'group/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('grupHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/grup_hapus.html'
    };
}]);

nodeManager.directive('grupEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/grup_edit.html'
    };
}]);

nodeManager.directive('grupInfoDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/grup_info.html'
    };
}]);

nodeManager.controller('MetalinksCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {

    $scope.datakeyword = function () {
             $http.get(CONFIG.api_url + 'keyword/list', {
                                    cache: false
                                }).success(function (data) {
                                    $scope.keywords = data;
                                   // console.log($scope.keywords);       
                                    

             });

                       
    }

    $scope.datakeyword();

    $scope.metadata = {};

    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariMetalinks = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $scope.upload = [];
    $scope.progress = 0;
    $scope.response = '';
    $scope.xml = '';

    parameters = {};


     $scope.simpan_metadata = function () {

        var tanggal2 = ($scope.tanggalku.toString()); 
        console.log((tanggal2.split('GMT')[0]).trim());

        parameters.tanggal = encodeURIComponent((tanggal2.split('GMT')[0]).trim());
        parameters.WORKSPACE = encodeURIComponent($rootScope.currentUser['grup']);
        parameters.ABSTRACT = encodeURIComponent($scope.layer_abstract);
        parameters.ID = encodeURIComponent($scope.layer_id);
        parameters.AKSES = encodeURIComponent($scope.akses.value);
        parameters.KEYWORD = encodeURIComponent($scope.keyword_item);

        // //Contac 
        parameters.individualName = encodeURIComponent($scope.individualName);
        parameters.organisationName = encodeURIComponent($scope.organisationName);
        parameters.positionName = encodeURIComponent($scope.positionName);
        parameters.phone = encodeURIComponent($scope.phone);
        parameters.facsimile = encodeURIComponent($scope.facsimile);
        parameters.deliveryPoint = encodeURIComponent($scope.deliveryPoint);
        parameters.city = encodeURIComponent($scope.city);
        parameters.postalCode = encodeURIComponent($scope.postalCode);
        parameters.country = encodeURIComponent($scope.country);
        parameters.electronicMailAddress = encodeURIComponent($scope.electronicMailAddress);
        
        parameters.linkage = encodeURIComponent($scope.linkage);
        
        parameters.hoursOfService = encodeURIComponent($scope.hoursOfService);
        parameters.contactInstructions = encodeURIComponent($scope.contactInstructions);


        // //Identification Info
        parameters.title_identification = encodeURIComponent($scope.title_identification);
        
        // //Distributor
        parameters.Distributor_individualName = encodeURIComponent($scope.Distributor_individualName);
        parameters.Distributor_organisationName = encodeURIComponent($scope.Distributor_organisationName);
        parameters.Distributor_positionName = encodeURIComponent($scope.Distributor_positionName);
        parameters.Distributor_phone = encodeURIComponent($scope.Distributor_phone);
        parameters.Distributor_facsimile = encodeURIComponent($scope.Distributor_facsimile);
        parameters.Distributor_deliveryPoint = encodeURIComponent($scope.Distributor_deliveryPoint);
        parameters.Distributor_city = encodeURIComponent($scope.Distributor_city);
        parameters.Distributor_postalCode = encodeURIComponent($scope.Distributor_postalCode);
        parameters.Distributor_country = encodeURIComponent($scope.Distributor_country);
        parameters.Distributor_electronicMailAddress = encodeURIComponent($scope.Distributor_electronicMailAddress);
        
        parameters.dataSetURI = encodeURIComponent($scope.dataSetURI)
        
        parameters.Distributor_hoursOfService = encodeURIComponent($scope.Distributor_hoursOfService);
        parameters.Distributor_contactInstructions = encodeURIComponent($scope.Distributor_contactInstructions);

         // //MetadataConstrains
            
        //parameters.usernote = encodeURIComponent($scope.akses.value);


        console.log(parameters);


            var data = $.param({
                    json: JSON.stringify({
                        pubdata: parameters
                    })
            });


            console.log(data);

            $http.post(CONFIG.api_url + 'lengkapmetadata', data).success(function (data, status) {
                pesan = data;
                console.log(pesan);
                bootbox.alert(pesan.MSG);
            });


       
     }

    $scope.theuser = $rootScope.currentUser['user']
    $scope.curwrk = $rootScope.currentUser['grup']
    $scope.curgrup = $rootScope.currentUser['kelas']
    $scope.cekgrup = function(user) {
        if ($scope.curgrup == 'admin' || user == $scope.curwrk) {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekadmin = function() {
        if ($scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.grup = [];

    $http.get(CONFIG.api_url + 'meta/list').success(function(data) {
        $scope.grup = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.grup.length / $scope.pageSize);
        }
    });

    $scope.selectedsimpul = [];

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    var TambahLinkDialogModel = function() {
        this.visible = false;
    };

    TambahLinkDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    TambahLinkDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var LihatLinkDialogModel = function() {
        this.visible = false;
    };

    LihatLinkDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'meta/view_json',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.lihatLink.item.xml = data
                });
            })
        });
        console.log(this.xml)
    };

    LihatLinkDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var PublishLinkDialogModel = function() {
        this.visible = false;
    };

    PublishLinkDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'meta/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.publishLink.item.xml = data
                });
            })
        });
        console.log(this.xml)
    };

    PublishLinkDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusLinkDialogModel = function() {
        this.visible = false;
    };

    HapusLinkDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusLinkDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.tambahLink = new TambahLinkDialogModel();
    $scope.lihatLink = new LihatLinkDialogModel();
    $scope.publishLink = new PublishLinkDialogModel();
    $scope.hapusLink = new HapusLinkDialogModel();
    $scope.linkntry = {}
    $scope.linkntry.name = ''
    $scope.linkntry.enabled = ''
    $scope.linkntry.akses = ''

    $scope.tambahGSLink = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'meta/link', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

    $scope.publishGSLink = function() {
        var params = $scope.model.item;
        params.xml = encodeURIComponent(params.xml)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'pycswRecord/insert', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

    $scope.hapusMDLink = function(identifier, workspace) {
        var params = {
            identifier: identifier,
            workspace: workspace
        }
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'pycswRecord/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

    $scope.FileSelect = function($files, identifier, akses) {
        console.log('INIT');
        console.log($files);
        if (akses == 'GOVERNMENT') {
            kode = '';
            try {
                for (var p = 0; p < $scope.selectedsimpul.selected.length; p++) {
                    kode = kode + $scope.selectedsimpul.selected[p].split(',')[0] + ',';
                }
                akses = akses + ':' + kode;
            } catch (err) {
                akses = 'GOVERNMENT'
            }
        }
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'meta/link', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: { identifier: identifier, akses: akses }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    pesan = data;
                    bootbox.alert(pesan.MSG)
                        // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    pesan = data;
                    bootbox.alert(pesan.MSG)
                    console.log(data);
                });
            })(i);
        }
    }

});

nodeManager.directive('linkTambahDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/meta_link.html'
    };
}]);

nodeManager.directive('linkLihatDialog', [function ($http,$scope) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function (scope, element, attributes,$http,$scope) {
            scope.$watch('model.visible', function (newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = true;
                    console.log(scope.model);
                    scope.tanggalku2 = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:dateStamp"]["gco:DateTime"]);
                    scope.tanggalku = new Date(scope.tanggalku2);
                    console.log(scope.tanggalku);

                    console.log(scope.model.item.identifier)
                    scope.layer_id = scope.model.item.identifier
                

                    scope.layer_abstract = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]); 
                    console.log(scope.layer_abstract)


                   
                    scope.keyword_item = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:descriptiveKeywords"]["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]); 
                    console.log(scope.keyword_item);

                      scope.datausernote =(scope.model.item.xml["gmd:MD_Metadata"]["gmd:metadataConstrains"]["gmd:MD_SecurityConstraints"]["gmd:userNote"]["gco:CharacterString"]);
                      console.log(scope.datausernote);                                                         
                      scope.akses = {  
                            "value": scope.datausernote, 
                            "values": [ "PUBLIC", "GOVERNMENT", "PRIVATE", "IGSTRATEGIS"] 
                          };

                   
                      
       
        // Contact                  
        try { 
            scope.individualName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:individualName"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.individualName = ""; 
        }  

        console.log(scope.individualName);

        try { 
             scope.organisationName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.organisationName = ""; 
        } 

        console.log(scope.organisationName);

        try {
            scope.positionName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
        }  catch (err)
        {
            scope.positionName = ""; 
        } 

         console.log(scope.positionName) ;       
        
        try {
           scope.phone = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:voice"]["gco:CharacterString"]);
        } catch (err)
        {
           scope.phone = ""; 
        }

         console.log(scope.phone);         
        
        try {
            scope.facsimile = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:facsimile"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.facsimile = ""; 
        }  

          console.log(scope.facsimile) ;      
        
        try {
            scope.deliveryPoint = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.deliveryPoint = ""; 
        }   

          console.log(scope.deliveryPoint) ;     
        
        try {
           scope.city = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.city = ""; 
        }  

            console.log(scope.city) 

        try {
           scope.postalCode = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.postalCode = ""; 
        } 

             console.log(scope.postalCode);

        try {
            scope.country = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.country = ""; 
        } 

             console.log(scope.country);        
        
        try {
           scope.electronicMailAddress = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.electronicMailAddress = ""; 
        }  

             console.log(scope.electronicMailAddress);

        
        try {
            scope.linkage = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
        } catch (err)
        {
            scope.linkage = ""; 
        }     

             console.log(scope.linkage);    
        
        try {
            scope.hoursOfService = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.hoursOfService = ""; 
        } 

             console.log(scope.hoursOfService);        
        
        try {
            scope.contactInstructions = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.contactInstructions = ""; 
        }  

             console.log(scope.contactInstructions) ;      
        


         // //Identification Info
        try {
            scope.title_identification = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.title_identification = ""; 
        }         
        
          console.log(scope.title_identification) ; 
        
        // //Distributor
        
        try { 
            scope.Distributor_individualName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:individualName"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_individualName = ""; 
        }    

              console.log(scope.Distributor_individualName) ;      
        
        try {
            scope.Distributor_organisationName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_organisationName = ""; 
        }  

                  console.log(scope.organisationName) ;        
        
        try {
            scope.Distributor_positionName = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
        } catch (err)
        {
                scope.Distributor_positionName = ""; 
        }   

                  console.log(scope.Distributor_positionName) ;       
        
        try {
            scope.Distributor_phone = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:voice"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_phone = ""; 
        }    

                  console.log(scope.Distributor_phone) ;      
        
        try {
            scope.Distributor_facsimile = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:facsimile"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_facsimile = ""; 
        }       

                  console.log(scope.Distributor_facsimile) ;   
        
        try {
            scope.Distributor_deliveryPoint = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_deliveryPoint = ""; 
        }      

                  console.log(scope.Distributor_deliveryPoint) ;    
        
        try {
            scope.Distributor_city = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_city = ""; 
        }    

                  console.log(scope.Distributor_city) ;      
        
        try {
            scope.Distributor_postalCode = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_postalCode = ""; 
        }    

                  console.log(scope.Distributor_postalCode) ;      
        
        try {
            scope.Distributor_country = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_country = ""; 
        }     

                    console.log(scope.Distributor_country) ;                   
        
        try {
            scope.Distributor_electronicMailAddress = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_electronicMailAddress = ""; 
        }         
        
        try {
            scope.dataSetURI = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"])
        } catch (err)
        {
            scope.dataSetURI = ""; 
        }    

                     console.log(scope.dataSetURI) ;           
        
        try {
            scope.Distributor_hoursOfService = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
        } catch (err)
        {
            scope.Distributor_hoursOfService = ""; 
        }    

                     console.log(scope.Distributor_hoursOfService) ;           
        

        try {
            scope.Distributor_contactInstructions = (scope.model.item.xml["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);      
        } catch (err)
        {
            scope.Distributor_contactInstructions = ""; 
        }         
            
        console.log(scope.Distributor_contactInstructions) ;     


                    //$scope.datakeyword()

                });
            });
            element.on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = false;
                });
            });
        },

        //templateUrl: 'templates/meta_view.html'
        templateUrl: 'templates/metadata_edit.html'
        

    };
}]);

nodeManager.directive('linkPublishDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/meta_publish.html'
    };
}]);

nodeManager.directive('linkHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/meta_unpublish.html'
    };
}]);

nodeManager.controller('MetakugiCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariMetalinks = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $scope.upload = [];
    $scope.progress = 0;
    $scope.response = '';
    $scope.xml = '';

    $scope.theuser = $rootScope.currentUser['user']
    $scope.curwrk = $rootScope.currentUser['grup']
    $scope.curgrup = $rootScope.currentUser['kelas']
    $scope.cekgrup = function(user) {
        if ($scope.curgrup == 'admin' || user == $scope.curwrk) {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekadmin = function() {
        if ($scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.grup = [];

    $http.get(CONFIG.api_url + 'metakugi/list').success(function(data) {
        $scope.grup = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.grup.length / $scope.pageSize);
        }
    });

    $scope.selectedsimpul = [];

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    var TambahKugiDialogModel = function() {
        this.visible = false;
    };

    TambahKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        this.item.db = 'pub';
        console.log(item);
        this.visible = true;
    };

    TambahKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var LihatKugiDialogModel = function() {
        this.visible = false;
    };

    LihatKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'metakugi/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.lihatKugi.item.xml = data
                });
            })
        });
        console.log(this.xml)
    };

    LihatKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var PublishKugiDialogModel = function() {
        this.visible = false;
    };

    PublishKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'metakugi/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.publishKugi.item.xml = data
                });
            })
        });
        console.log(this.xml)
    };

    PublishKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusKugiDialogModel = function() {
        this.visible = false;
    };

    HapusKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.tambahKugi = new TambahKugiDialogModel();
    $scope.lihatKugi = new LihatKugiDialogModel();
    $scope.publishKugi = new PublishKugiDialogModel();
    $scope.hapusKugi = new HapusKugiDialogModel();
    $scope.linkntry = {}
    $scope.linkntry.name = ''
    $scope.linkntry.enabled = ''
    $scope.linkntry.akses = ''

    $scope.tambahGSKugi = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'metakugi/link/' + param.db, data).success(function(data, status) {
            $scope.test = data;
            console.log($scope.test);
        })
    }

    $scope.publishGSKugi = function() {
        var params = $scope.model.item;
        params.xml = encodeURIComponent(params.xml)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'pycswRecord/insert', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

    $scope.hapusMDKUGI = function(identifier) {
        var params = {
            identifier: identifier,
            workspace: 'KUGI'
        }
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'pycswRecord/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

    $scope.FileSelect = function($files, identifier, akses, skema, fitur, db) {
        console.log('INIT');
        console.log($files);
        if (akses == 'GOVERNMENT') {
            kode = '';
            try {
                for (var p = 0; p < $scope.selectedsimpul.selected.length; p++) {
                    kode = kode + $scope.selectedsimpul.selected[p].split(',')[0] + ',';
                }
                akses = akses + ':' + kode;
            } catch (err) {
                akses = 'GOVERNMENT'
            }
        }
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'metakugi/link/' + db, // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: { identifier: identifier, akses: akses, skema: skema, fitur: fitur, workspace: $scope.curwrk }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    console.log(data);
                });
            })(i);
        }
    }

});

nodeManager.directive('kugiTambahDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/metakugi_link.html'
    };
}]);

nodeManager.directive('kugiLihatDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/metakugi_view.html'
    };
}]);

nodeManager.directive('kugiPublishDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/metakugi_publish.html'
    };
}]);

nodeManager.directive('kugiHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/metakugi_unpublish.html'
    };
}]);

nodeManager.controller('testCtrl', function($scope, CONFIG, LAYER, $http, $base64, $upload, $timeout, USER_ROLES) {
    $scope.upload = [];
    $scope.progress = 0;
    // $scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };
    $scope.FileSelect = function($files) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'upload', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.abortUpload = function(index) {
        $scope.upload[index].abort();
    }
});

nodeManager.controller('ctrl_dbdev', function($rootScope, $scope, CONFIG, LAYER, $window, $http, $base64, $upload, $timeout, $state, $stateParams, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariFitur = ''; // set the default search/filter term

    $scope.loader = {
        loading: false,
    };

    $scope.loader_work = false

    $scope.showloader = function() {
        $scope.loader.loading = true;
    }
    $scope.hideloader = function() {
        $scope.loader.loading = false;
    }

    $scope.cek_meta = function(identifier) {
        if ($scope.metadevlist.indexOf(identifier) === -1) {
            return true
        } else {
            return false
        }
    }

    $http.get(CONFIG.api_url + 'cekmeta/metakugi_dev').success(function(data) {
        $scope.metadevlist = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.cekprod = function(identifier) {
        $http.get(CONFIG.api_url + 'cekprod/' + identifier, { cache: true }).success(function(data) {
            if (data.Result == true) {
                return false
            } else {
                return true
            }
        });
    }

    $scope.reloadDBView = function(dbkugi) {
        db = {}
        db.dbkugi = dbkugi
        var params = db;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'refresh_dbmetaview', data)
            .success(function(data, status) {
                $scope.test = data;
                $scope.reloadView();
                console.log($scope.test);
            })
    }

    var EksporDevprodDialogModel = function() {
        this.visible = false;
    };

    EksporDevprodDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EksporDevprodDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusDevprodDialogModel = function() {
        this.visible = false;
    };

    HapusDevprodDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusDevprodDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var TambahKugiDialogModel = function() {
        this.visible = false;
    };

    TambahKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        this.item.db = 'dev';
        console.log(item);
        this.visible = true;
    };

    TambahKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var LihatKugiDialogModel = function() {
        this.visible = false;
    };

    LihatKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'metakugi_dev/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.lihatKugi.item.xml = data
                });
            })
        });
        // console.log(this.xml)
    };

    LihatKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.tambahKugi = new TambahKugiDialogModel();
    $scope.lihatKugi = new LihatKugiDialogModel();
    $scope.hapusDevprod = new HapusDevprodDialogModel();
    $scope.eksporDevprod = new EksporDevprodDialogModel();

    $scope.eksporDEVPROD = function(item) {
        var params = item;
        params.source_db = $rootScope.currentUser.grup + '_DEV'
        params.dest_db = 'palapa_prod'
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'kopitable', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            $scope.loader_work = false
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.hapusKUGI = function(skema, fitur, identifier, db) {
        var params = {};
        params.skema = skema
        params.fitur = fitur
        params.identifier = identifier
        params.db = db
        params.grup = $rootScope.currentUser.grup
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'delete_spatial_records', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.features = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'dbdevisifeature/' + $rootScope.currentUser.grup).success(function(data) {
        $scope.features = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.features.length / $scope.pageSize);
        }
    });
});

nodeManager.directive('eksporDevprodDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_dev_export.html'
    };
}]);

nodeManager.directive('hapusDevprodDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_dev_hapus.html'
    };
}]);

nodeManager.controller('ctrl_dbprod', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariFitur = ''; // set the default search/filter term
    $scope.currusr = $rootScope.currentUser.user;
    $scope.curkelas = $rootScope.currentUser.kelas;

    $scope.loader = {
        loading: false,
    };

    $scope.showloader = function() {
        $scope.loader.loading = true;
    }
    $scope.hideloader = function() {
        $scope.loader.loading = false;
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.reloadDBView = function(dbkugi) {
        db = {}
        db.dbkugi = dbkugi
        var params = db;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'refresh_dbmetaview', data).success(function(data, status) {
            $scope.test = data;
            $scope.reloadView();
            console.log($scope.test);
        })
    }

    $scope.cek_meta = function(identifier) {
        try {
            if ($scope.metadevlist.indexOf(identifier) === -1) {
                return true
            } else {
                return false
            }
        } catch (err) {
            //
        }
    }

    $scope.cekadmin = function() {
        if ($scope.curkelas == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekuser = function(user) {
        if ($scope.theuser == user || $scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekpub = function(identifier) {
        $http.get(CONFIG.api_url + 'cekpub/' + identifier, { cache: true }).success(function(data) {
            console.log(data)
            if (data.Result == true) {
                return false
            } else {
                return true
            }
        });
    }

    $scope.saverow = function(database, item) {
        console.log(item)
        $.fileDownload(CONFIG.api_url + 'savetable/' + database + '/' + item.dataset + '/' + item.feature + '/' + item.identifier)
            // $http.get(CONFIG.api_url + 'savetable/' + database + '/' + item.dataset + '/' + item.feature + '/' + item.identifier).success(function(data) {
            //     var anchor = angular.element('<a/>');
            //     anchor.attr({
            //         href: 'data:application/gml+xml;charset=utf-8,' + encodeURI(data),
            //         target: '_blank',
            //         download: item.feature + '_' + identifier + '.gml'
            //     })[0].click();
            // });
    }

    $http.get(CONFIG.api_url + 'cekmeta/metakugi_prod').success(function(data) {
        $scope.metadevlist = data;
    });

    var EksporProdpubDialogModel = function() {
        this.visible = false;
    };

    EksporProdpubDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EksporProdpubDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusProdpubDialogModel = function() {
        this.visible = false;
    };

    HapusProdpubDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusProdpubDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var TambahKugiDialogModel = function() {
        this.visible = false;
    };

    TambahKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        this.item.db = 'prod';
        console.log(item);
        this.visible = true;
    };

    TambahKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var LihatKugiDialogModel = function() {
        this.visible = false;
    };

    LihatKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'metakugi_prod/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.lihatKugi.item.xml = data
                });
            })
        });
        // console.log(this.xml)
    };

    LihatKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.tambahKugi = new TambahKugiDialogModel();
    $scope.lihatKugi = new LihatKugiDialogModel();

    $scope.hapusProdpub = new HapusProdpubDialogModel();
    $scope.eksporProdpub = new EksporProdpubDialogModel();

    $scope.eksporPRODPUB = function(item) {
        var params = item;
        params.source_db = 'palapa_prod'
        params.dest_db = 'palapa_pub'
        console.log(params)
        $scope.loader.loading = true;
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'kopitable', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            $scope.loader.loading = false;
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.hapusKUGI = function(skema, fitur, identifier, db) {
        var params = {};
        params.skema = skema
        params.fitur = fitur
        params.identifier = identifier
        params.db = db
        params.grup = $rootScope.currentUser.grup
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'delete_spatial_records', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.features = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'dbprodisifeature').success(function(data) {
        $scope.features = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.features.length / $scope.pageSize);
        }
    });
});

nodeManager.directive('eksporProdpubDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_prod_export.html'
    };
}]);

nodeManager.directive('hapusProdpubDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_prod_hapus.html'
    };
}]);

nodeManager.controller('ctrl_dbpub', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariFitur = ''; // set the default search/filter term
    $scope.currusr = $rootScope.currentUser.user;
    $scope.curkelas = $rootScope.currentUser.kelas;

    $scope.loader = {
        loading: false,
    };

    $scope.showloader = function() {
        $scope.loader.loading = true;
    }
    $scope.hideloader = function() {
        $scope.loader.loading = false;
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.saverow = function(database, item) {
        console.log(item)
        $.fileDownload(CONFIG.api_url + 'savetable/' + database + '/' + item.dataset + '/' + item.feature + '/' + item.identifier)
            // $http.get(CONFIG.api_url + 'savetable/' + database + '/' + item.dataset + '/' + item.feature + '/' + item.identifier).success(function(data) {
            //     var anchor = angular.element('<a/>');
            //     anchor.attr({
            //         href: 'data:application/gml+xml;charset=utf-8,' + encodeURI(data),
            //         target: '_blank',
            //         download: item.feature + '_' + identifier + '.gml'
            //     })[0].click();
            // });
    }


    $scope.reloadDBView = function(dbkugi) {
        db = {}
        db.dbkugi = dbkugi
        var params = db;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'refresh_dbmetaview', data).success(function(data, status) {
            $scope.test = data;
            $scope.reloadView();
            console.log($scope.test);
        })
    }

    $scope.cekadmin = function() {
        if ($scope.curkelas == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cek_meta = function(identifier) {
        try {
            if ($scope.metadevlist.indexOf(identifier) === -1) {
                return true
            } else {
                return false
            }
        } catch (err) {
            //
        }
    }

    $http.get(CONFIG.api_url + 'cekmeta/metakugi').success(function(data) {
        $scope.metadevlist = data;
    });

    var PublishKugiDialogModel = function() {
        this.visible = false;
    };

    PublishKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    PublishKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var HapusPubDialogModel = function() {
        this.visible = false;
    };

    HapusPubDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusPubDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var TambahKugiDialogModel = function() {
        this.visible = false;
    };

    TambahKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        this.item.db = 'pub';
        console.log(item);
        this.visible = true;
    };

    TambahKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var LihatKugiDialogModel = function() {
        this.visible = false;
    };

    LihatKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
        $http({
            url: CONFIG.api_url + 'metakugi/view',
            method: 'GET',
            params: { identifier: item.identifier }
        }).success(function(data) {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.lihatKugi.item.xml = data
                });
            })
        });
        // console.log(this.xml)
    };

    LihatKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.tambahKugi = new TambahKugiDialogModel();
    $scope.lihatKugi = new LihatKugiDialogModel();

    $scope.hapusPub = new HapusPubDialogModel();
    $scope.publishKugi = new PublishKugiDialogModel();

    $scope.hapusKUGI = function(skema, fitur, identifier, db) {
        var params = {};
        params.skema = skema
        params.fitur = fitur
        params.identifier = identifier
        params.db = db
        params.grup = $rootScope.currentUser.grup
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'delete_spatial_records', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.features = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'dbpubisifeature').success(function(data) {
        $scope.features = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.features.length / $scope.pageSize);
        }
    });
});

nodeManager.directive('hapusPubDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_pub_hapus.html'
    };
}]);

nodeManager.directive('publishKugiDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_pub_publish.html'
    };
}]);

nodeManager.controller('ctrl_dbpub_publikasi', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariFitur = ''; // set the default search/filter term
    $scope.wrkavail = false;
    $scope.currusr = $rootScope.currentUser.user;
    $scope.curkelas = $rootScope.currentUser.kelas;

    $scope.cekadmin = function() {
        console.log($scope.curkelas)
        if ($scope.curkelas == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    var params = {};
    params.workspace = 'KUGI'
    console.log(params)
    var data = $.param({
        json: JSON.stringify({
            pubdata: params
        })
    });
    $http.post(CONFIG.api_url + 'checkworkspace', data).success(function(data, status) {
        $scope.test = data;
        if ($scope.test.RTN == 'OK') {
            $scope.wrkavail = true
        } else {
            $scope.wrkavail = false
        }
        console.log($scope.wrkavail);
    })

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    var PublishGeoKugiDialogModel = function() {
        this.visible = false;
    };

    PublishGeoKugiDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    PublishGeoKugiDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.publishKugi = new PublishGeoKugiDialogModel();

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.features = [];

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'grupfitur').success(function(data) {
        $scope.features = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.features.length / $scope.pageSize);
        }
    });

    $scope.tambahGSGrup = function() {
        var params = {};
        params.name = 'KUGI'
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'preparekugi', data).success(function(data, status) {
            $scope.test = data;
            console.log($scope.test);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

    $scope.publishKUGI = function(item) {
        var params = item;
        params.source_db = 'palapa_prod'
        params.dest_db = 'palapa_pub'
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'publishkugi', data).success(function(data, status) {
            pesan = data;
            console.log(pesan);
            bootbox.alert(pesan.MSG);
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        })
    }

});

nodeManager.directive('publishGeoKugiDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/db_pub_publish.html'
    };
}]);

nodeManager.controller('ctrl_data_to_dev', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $interval) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariFitur = ''; // set the default search/filter term

    $scope.upload = [];
    $scope.upload_nk = []
    $scope.upload_docs = [];
    $scope.upload_mt = []
    $scope.progress = 0;
    $scope.progress_nk = 0;
    $scope.progress_docs = 0;
    $scope.progress_mt = 0;
    $scope.response = '';
    $scope.nkresponse = '';
    $scope.nkr = undefined;
    $scope.dbschema = '';
    $scope.scale = '';
    $scope.iden_unik = [];

    $scope.multikode = [];
    $scope.stagekugi = 0;
    $scope.stagenonkugi = 0;

    $scope.currentGrup = $rootScope.currentUser.grup;
    $scope.currentKode = $rootScope.kodesimpul;
    $scope.loader_work = false

    $scope.linkntry = {}
    $scope.linkntry.name = ''
    $scope.linkntry.enabled = ''
    $scope.linkntry.akses = ''
    $scope.linkntry.id = ''

    $scope.nstage1 = true;
    $scope.nstage1_shape = false;
    $scope.nstage1_berkas = true;
    $scope.nstage2 = false;
    $scope.nstage3 = false;
    $scope.metaitem = 0;
    $scope.metatotal = 1;

    $scope.selectedsimpul = [];

    // $scope.keywords = [];

    $scope.cekadmin = function() {
        if ($scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $scope.cekuser = function(user) {
        if ($scope.theuser == user || $scope.curgrup == 'admin') {
            return false;
        } else {
            return true;
        }
    }

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    $http.get(CONFIG.api_url + 'kodeepsg', { cache: true }).success(function(data) {
        $scope.kodeepsg = data;
    });

    $http.get(CONFIG.api_url + 'keyword/list', { cache: false }).success(function(data) {
        $scope.keywords = data;
    });

    $scope.stage2 = function() {
        $scope.nstage1_berkas = true;
        $scope.nstage2 = true;
        $scope.nstage1 = false;
        console.log($scope.keywords);
    }

    $scope.FileSelect = function($files, schema, fitur, scale) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                var params = {}
                params.USER = $rootScope.currentUser['user']
                params.GRUP = $rootScope.currentUser['grup']
                params.schema = schema
                params.fitur = fitur
                params.skala = scale
                var dataparam = $.param({
                    json: JSON.stringify({
                        pubdata: params
                    })
                });
                console.log(params)
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'kugiappenddata', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: params
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    // $scope.loader_work = true
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    $scope.iden_unik = $scope.response['IDEN']
                    try {
                        $scope.metaitem = $scope.iden_unik.length;
                        console.log($scope.metaitem)
                    } catch (err) {
                        //
                    }
                    // $scope.loader_work = false
                    bootbox.alert($scope.response.MSG);
                    // $state.go('db_dev');
                    //angular.element(document.getElementById('eWNext'))[0].disabled = false;
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG);
                    $state.go('db_dev');
                    //ngular.element(document.getElementById('eWNext'))[0].disabled = true;
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.todbdev = function() {
        $state.go('db_dev');
    }

    $scope.GetSkala = function() {
        $scope.strSkala = document.getElementById("skala").value;
        var skalaset = document.getElementById("skala")
        $scope.scale = skalaset.options[skalaset.selectedIndex].text;
    };
    $scope.GetKategori = function() {
        $scope.strKategori = document.getElementById("kategori").value;
        var kategoriset = document.getElementById("kategori")
        $scope.dbschema = kategoriset.options[kategoriset.selectedIndex].text;
        console.log($scope.dbschema);
    };

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    // create the list of sushi rolls 
    // $http.get(CONFIG.api_url + 'dbdevfeature').success(function(data) {
    //     $scope.features = data;
    // });

    $http.get(CONFIG.api_url + 'gruponlyfitur/' + $scope.currentGrup).success(function(data) {
        $scope.features = data;
    });

    $scope.NKFileSelect = function($files) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                var params = {}
                params.USER = $rootScope.currentUser['user']
                params.GRUP = $rootScope.currentUser['grup']
                params.KODESIMPUL = $rootScope.kodesimpul
                var dataparam = $.param({
                    json: JSON.stringify({
                        pubdata: params
                    })
                });
                console.log(params)
                $scope.upload_nk[index] = $upload.upload({
                    url: CONFIG.api_url + 'upload', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: params
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress_nk = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.safeApply(function() {
                        $scope.nkresponse = data;
                    });
                    bootbox.alert($scope.nkresponse.MSG)
                    $scope.nstage1_shape = true;
                    $scope.nstage1_berkas = false;
                    // file is uploaded successfully
                    console.log($scope.nkresponse);
                    $scope.nkr = $scope.nkresponse;
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.nkresponse = data;
                    // angular.element(document.getElementById('eWNext'))[0].disabled = true;
                    bootbox.alert($scope.nkresponse.MSG)
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.metastagecek = function() {
        console.log($scope.metatotal);
        console.log($scope.metaitem);
        if ($scope.metatotal === $scope.metaitem + 1) {
            $scope.savebtn = false;
            return false
        } else {
            return true
        }
    }

    $scope.savebtn = true;

    $scope.MetaFileSelect = function($files, identifier, akses, kodesimpul) {
        console.log('INIT');
        console.log($files);
        console.log($scope.selectedsimpul)
        if (akses == 'GOVERNMENT') {
            kode = '';
            try {
                for (var p = 0; p < $scope.selectedsimpul.selected.length; p++) {
                    kode = kode + $scope.selectedsimpul.selected[p].split(',')[0] + ',';
                }
                akses = akses + ':' + kode;
            } catch (err) {
                akses = 'GOVERNMENT'
            }
        }
        console.log(akses)
            //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload_mt[index] = $upload.upload({
                    url: CONFIG.api_url + 'meta/link', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: {
                        identifier: identifier,
                        akses: akses,
                        kodesimpul: kodesimpul
                    }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress_mt = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG)
                    $state.go('db_dev');
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG)
                    $state.go('db_dev');
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.KMetaFileSelect = function($files, fitur, identifier, akses, kodesimpul) {
        console.log('INIT');
        console.log($files);
        // console.log($scope.selectedsimpul)
        if (akses == 'GOVERNMENT') {
            kode = '';
            try {
                for (var p = 0; p < $scope.selectedsimpul.selected.length; p++) {
                    kode = kode + $scope.selectedsimpul.selected[p].split(',')[0] + ',';
                }
                akses = akses + ':' + kode;
            } catch (err) {
                akses = 'GOVERNMENT'
            }
        }
        console.log(akses)
            //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload_mt[index] = $upload.upload({
                    url: CONFIG.api_url + 'metakugi/link/dev', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: { identifier: identifier, akses: akses, skema: $scope.dbschema, fitur: fitur, kodesimpul: kodesimpul }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    // $scope.progress_mt = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.response = data;
                    $scope.metatotal = $scope.metatotal + 1;
                    bootbox.alert($scope.response.MSG);
                    $scope.metastagecek();
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.response = data;
                    bootbox.alert($scope.response.MSG)
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.testsmp = function(selectedsimpul) {
        console.log(selectedsimpul)
    }

    $scope.BerkasSelect = function($files, identifier) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload_docs[index] = $upload.upload({
                    url: CONFIG.api_url + 'docs/link', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    identifier: identifier
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress_docs = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $scope.safeApply(function() {
                        $scope.bresponse = data;
                    });
                    bootbox.alert($scope.bresponse.MSG)
                    $scope.nstage1_berkas = true;
                    $scope.nstage2 = true;
                    $scope.nstage1 = false;
                    // file is uploaded successfully
                    console.log(data);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    $scope.bresponse = data;
                    bootbox.alert($scope.bresponse.MSG);
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.publish = function() {
        params = $scope.nkresponse;
        console.log(params);
        try {
            params.ABS = encodeURIComponent($scope.model.layer.layer_abstract);
            if (typeof params.ID == 'undefined') {
                params.ID = encodeURIComponent(params.ID);
            } else {
                params.ID = encodeURIComponent($scope.model.layer.layer_name);
            }

        } catch (e) {
            params.ABS = '';
            //params.ID = encodeURIComponent($scope.model.layer.layer_name);
        }
        params.USER = $rootScope.currentUser['user']
        params.GRUP = $rootScope.currentUser['grup']
            // params = params.concat($scope.model.layer.layer_abstract);
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'publish', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            $scope.ingeoserver = true
            console.log($scope.response.ID);
            // console.log($scope.model.layer.layer_name);
            if (typeof $scope.response.ID == 'undefined') {
                $scope.linkntry.id = encodeURIComponent("Ganti teks judul ini.");
            } else {
                $scope.linkntry.id = encodeURIComponent($scope.response.ID);
            }
            $scope.nstage2 = false;
            $scope.nstage3 = true;
            console.log(pesan);
        })
    }


});

nodeManager.controller('SistemCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term
    $scope.sisteminfo = '';

    $http.get(CONFIG.api_url + 'kodesimpulext').success(function(data) {
        $scope.kodesimpul = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';
    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }


    $scope.sisteminfoedit = function() {
        var params = $scope.sisteminfo;
        params.organization = encodeURIComponent(params.organization)
        params.url = encodeURIComponent(params.url)
        params.city = encodeURIComponent(params.city)
        params.fax = encodeURIComponent(params.fax)
        params.positionname = encodeURIComponent(params.positionname)
        params.hoursofservice = encodeURIComponent(params.hoursofservice)
        params.phone = encodeURIComponent(params.phone)
        params.administrativearea = encodeURIComponent(params.administrativearea)
        params.address = encodeURIComponent(params.address)
        params.postalcode = encodeURIComponent(params.postalcode)
        params.email = encodeURIComponent(params.email)
        params.individualname = encodeURIComponent(params.individualname)
        params.kodesimpul = encodeURIComponent(params.kodesimpul)
        params.tentangkami = encodeURIComponent(params.tentangkami)
        params.logo = $scope.berkas_logo;
        console.log(params.tentangkami)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'sisteminfo/edit', data).success(function(data, status) {
            bootbox.alert(data.MSG)
        })
    }

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'sisteminfo').success(function(data) {
        $scope.sisteminfo = data;
    });
});

nodeManager.controller('SisFrontCMSCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, olData, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term
    $scope.sisteminfo = '';

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $http.get(CONFIG.api_url + 'frontend').success(function(data) {
        $scope.frontend_content = data;
        console.log($scope.frontend_content)
    });

    $scope.uploadGambar1 = function($files) {
        $scope.gambar1File = $files;
        // console.log($scope.gambar1File);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_gambar1 = reader.result;
            // console.log($scope.berkas_gambar1);
        }
    }

    $scope.uploadGambar2 = function($files) {
        $scope.gambar2File = $files;
        // console.log($scope.gambar2File);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_gambar2 = reader.result;
            // console.log($scope.berkas_gambar2);
        }
    }

    $scope.uploadGambar3 = function($files) {
        $scope.gambar3File = $files;
        // console.log($scope.gambar3File);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_gambar3 = reader.result;
            // console.log($scope.berkas_gambar3);
        }
    }

    $scope.uploadGambar4 = function($files) {
        $scope.gambar4File = $files;
        // console.log($scope.gambar4File);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_gambar4 = reader.result;
            // console.log($scope.berkas_gambar4);
        }
    }


    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        // console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            // console.log($scope.berkas_logo);
        }
    }

    $scope.SimpanTheme = function() {
        var params = {};
        params.id = $scope.frontend_content[0].id;
        params.remark_1 = encodeURIComponent($scope.frontend_content[0].remark_1);
        params.image_1 = $scope.berkas_gambar1;
        params.image_2 = $scope.berkas_gambar2;
        params.image_3 = $scope.berkas_gambar3;
        params.image_4 = $scope.berkas_gambar4;
        console.log(params)
            // console.log($scope.frontend_content)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        // console.log(data)
        $http.post(CONFIG.api_url + 'setfrontend', data).success(function(data, status) {
            $scope.reloadView();
            pesan = data;
            params.remark_1 = decodeURIComponent(params.remark1);
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        });
        $scope.reloadView();
    }
});

nodeManager.controller('SisFrontCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term
    $scope.sisteminfo = '';

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.wmslayer = [];

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $http.get(CONFIG.api_url + 'getWMSlayers').success(function(data) {
        // $scope.wmslayer = data;
        for (i = 0, len = data.length, layer_nativename = ''; i < len; i++) {
            if (data[i].layer_aktif == true) {
                $scope.wmslayer.push({ 'id': i, 'layer_nativename': data[i].layer_nativename, 'layer_title': data[i].layer_name, 'aktif': false, 'pilih': false });
            }
        };
        $scope.numberOfPages = function() {
            return Math.ceil($scope.wmslayer.length / $scope.pageSize);
        }
        console.log($scope.wmslayer)
    });

    $scope.wmsname = {
        wmslayer: []
    }

    $http.get(CONFIG.api_url + 'front_layers').success(function(data) {
        $scope.selectedlayers = data;
        console.log(data)
    });

    $scope.searchfeatured = function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].layer_nativename === nameKey) {
                return myArray[i];
            }
        }
    }

    $scope.searchaktiffeatured = function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].layer_nativename === nameKey && myArray[i].aktif === true) {
                return myArray[i];
            }
        }
    }

    $scope.ceklayer = function(layer) {
        var result = $scope.searchfeatured(layer, $scope.selectedlayers)
        if (typeof result == 'undefined') {
            return false
        } else {
            return true
        }
    }

    $scope.ceklayeraktif = function(layer) {
        var result = $scope.searchaktiffeatured(layer, $scope.selectedlayers)
        if (typeof result == 'undefined') {
            return false
        } else {
            return true
        }
    }


    $scope.SimpanLayer = function() {
        var params = $scope.wmslayer;
        // params.layer_title = encodeURIComponent(params.layer_title);
        for (i = 0, len = params.length; i < len; i++) {
            params[i].layer_title = encodeURIComponent(params[i].layer_title);
        }
        console.log(params);
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'front_layers/add', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
            $scope.reloadView();
        })
    }

    $scope.KosongLayer = function() {
        var params = $scope.wmslayer;
        params.layer_title = encodeURIComponent(params.layer_title)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'front_layers/truncate', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }


    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }
});

nodeManager.controller('GrupFiturCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariLayer = ''; // set the default search/filter term
    // $scope.listfitur = '';
    $scope.grupfitur = ['List', 'Fitur'];
    $scope.selectedfitur = [];

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.GetGrupFitur = function(grup) {
        console.log(grup)
        $http.get(CONFIG.api_url + 'grupfitur/' + grup).success(function(data) {
            $scope.selectedfitur = data;
        });
    };

    $scope.GetSkala = function() {
        $scope.strSkala = document.getElementById("skala").value;
        var skalaset = document.getElementById("skala")
        $scope.scale = skalaset.options[skalaset.selectedIndex].text;
    };

    $scope.GetKategori = function() {
        $scope.strKategori = document.getElementById("kategori").value;
        var kategoriset = document.getElementById("kategori")
        $scope.dbschema = kategoriset.options[kategoriset.selectedIndex].text;
        console.log($scope.dbschema);
        $http.get(CONFIG.api_url + 'dbkugilist/' + $scope.dbschema).success(function(data) {
            $scope.listfitur = data;
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.grupfitur = $scope.listfitur.sort()
                    console.log("A", $scope.grupfitur);
                });
            })
            console.log("B", $scope.grupfitur);
        });
        console.log("C", $scope.grupfitur);
    };

    // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'dbdevfeature').success(function(data) {
        $scope.features = data;
    });

    $http.get(CONFIG.api_url + 'group/list').success(function(data) {
        grup = []
        for (o = 0, leno = data.length; o < leno; o++) {
            grup.push(data[o].name)
        }
        console.log(grup)
        $scope.groups = grup
    });
    console.log($scope.groups)

    $scope.filterable = {
        placeholder: 'Filter fitur...'
    };

    $scope.klikselect = function(fitur, grup) {
        if ($scope.selectedfitur.length == 0) {
            $scope.selectedfitur.push({ groupname: grup, fitur: fitur, skema: $scope.dbschema, skala: $scope.scale })
        } else {
            fiturs = []
            for (i = 0, len = $scope.selectedfitur.length; i < len; i++) {
                fiturs.push($scope.selectedfitur[i].fitur)
            }
            if (fiturs.indexOf(fitur) === -1) {
                console.log("FALSE", fitur)
                $scope.selectedfitur.push({ groupname: grup, fitur: fitur, skema: $scope.dbschema, skala: $scope.scale })
            } else {
                console.log("TRUE", fitur)
            }
        }
        // $scope.selectedfitur.push(fitur)
        console.log($scope.selectedfitur)
    }

    $scope.klikdelete = function(index) {
        $scope.selectedfitur.splice(index, 1);
    }

    $scope.grupfitur_simpan = function(grup) {
        var params = $scope.selectedfitur;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'grupfitur/simpan/' + grup, data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
        })
    }

});

nodeManager.controller('LogCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.loginfo = '';
});

nodeManager.controller('DocsCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariStyles = ''; // set the default search/filter term

    $scope.upload = [];
    $scope.progress = 0;
    $scope.response = '';
    $scope.layers = '';


    $http.get(CONFIG.api_url + 'getWMSlayers').success(function(data) {
        $scope.layers = data;
    });

    $scope.reloadView = function() {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
        // create the list of sushi rolls 
    $http.get(CONFIG.api_url + 'getdocs').success(function(data) {
        $scope.docs = data;
    });

    $scope.getBaseUrl = function() {
        var re = new RegExp(/^.*\//);
        return re.exec(window.location.href);
    }

    $scope.toclipboard = function(text) {
        console.log(text)
        var baseurl = $scope.getBaseUrl()
        baseurl = baseurl[0].substring(0, baseurl[0].length - 2);
        console.log(baseurl)
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = baseurl + 'documents/' + text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    var HapusDocsDialogModel = function() {
        this.visible = false;
    };

    HapusDocsDialogModel.prototype.open = function(doc) {
        this.doc = doc;
        console.log(doc);
        this.visible = true;
    };

    HapusDocsDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.hapusGSDocs = function() {
        var params = $scope.model.doc.name;
        // console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'docs/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            console.log(pesan);
            // console.log($scope.test);
            // $state.transitionTo($state.current, $stateParams, {
            //     reload: true,
            //     inherit: false,
            //     notify: true
            // });
        })
    }

    $scope.hapusDocs = new HapusDocsDialogModel();
    $scope.layerid = '';

    $scope.FileSelect = function($files) {
        console.log('INIT');
        console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function(index) {
                $scope.upload[index] = $upload.upload({
                    url: CONFIG.api_url + 'docs/add', // webapi url
                    method: "POST",
                    // data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file,
                    params: {
                        identifier: $scope.layerid.layer_id
                    }
                }).progress(function(evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    pesan = data;
                    bootbox.alert(pesan.MSG)
                        // file is uploaded successfully
                    console.log(pesan);
                }).error(function(data, status, headers, config) {
                    // file failed to upload
                    pesan = data;
                    bootbox.alert(pesan.MSG)
                    console.log(pesan);
                });
            })(i);
        }
    }
});

nodeManager.directive('docsHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/docs_hapus.html'
    };
}]);

nodeManager.controller('KeywordCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.keyword = [];

    $http.get(CONFIG.api_url + 'keyword/list').success(function(data) {
        $scope.keyword = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.keyword.length / $scope.pageSize);
        }
    });

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.uploadBerkasLogo = function($files) {
        // console.log('INIT');
        // console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        //     var $file = $files[i];
        //     (function(index) {
        //         $scope.berkas_logo = encodeImageFileAsURL($file);
        //     })(i);
        // }
        // console.log($scope.berkas_logo);
    }

    var HapusKeywordDialogModel = function() {
        this.visible = false;
    };

    HapusKeywordDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusKeywordDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditKeywordDialogModel = function() {
        this.visible = false;
    };

    EditKeywordDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EditKeywordDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoKeywordDialogModel = function() {
        this.visible = false;
    };

    InfoKeywordDialogModel.prototype.open = function(item) {
        this.item = item;
        this.visible = true;
        console.log(item);
    };

    InfoKeywordDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.infoKeyword = new InfoKeywordDialogModel();
    $scope.hapusKeyword = new HapusKeywordDialogModel();
    $scope.editKeyword = new EditKeywordDialogModel();
    $scope.keywordentry = {}
    $scope.keywordentry.keyword = ''

    $scope.tambahGSKeyword = function() {
        var params = $scope.keywordentry;
        params.keyword = encodeURIComponent(params.keyword)
        params.logo = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'keyword/add', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSKeyword = function(item) {
        var params = item;
        params.keyword = encodeURIComponent(params.keyword)
        params.logo = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'keyword/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            params.keyword = decodeURIComponent(params.keyword)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSKeyword = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'keyword/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('keywordHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/keyword_hapus.html'
    };
}]);

nodeManager.directive('keywordEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/keyword_edit.html'
    };
}]);

nodeManager.controller('ExtSrvCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.extsrv = [];

    $http.get(CONFIG.api_url + 'extsrv/list').success(function(data) {
        $scope.extsrv = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.extsrv.length / $scope.pageSize);
        }
    });

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.uploadBerkasLogo = function($files) {
        // console.log('INIT');
        // console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        //     var $file = $files[i];
        //     (function(index) {
        //         $scope.berkas_logo = encodeImageFileAsURL($file);
        //     })(i);
        // }
        // console.log($scope.berkas_logo);
    }

    var HapusExtsrvDialogModel = function() {
        this.visible = false;
    };

    HapusExtsrvDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusExtsrvDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditExtsrvDialogModel = function() {
        this.visible = false;
    };

    EditExtsrvDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EditExtsrvDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoExtsrvDialogModel = function() {
        this.visible = false;
    };


    $scope.hapusExtsrv = new HapusExtsrvDialogModel();
    $scope.editExtsrv = new EditExtsrvDialogModel();
    $scope.extsrventry = {}
    $scope.extsrventry.extsrv = ''

    $scope.tambahGSExtsrv = function() {
        var params = $scope.extsrventry;
        params.name = encodeURIComponent(params.name)
        params.url = encodeURIComponent(params.url)
        params.type = encodeURIComponent(params.type)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'extsrv/add', data).success(function(data, status) {
            pesan = data;
            params.name = decodeURIComponent(params.name)
            params.url = decodeURIComponent(params.url)
            params.type = decodeURIComponent(params.type)
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSExtsrv = function(item) {
        var params = item;
        params.name = encodeURIComponent(params.name)
        params.url = encodeURIComponent(params.url)
        params.type = encodeURIComponent(params.type)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'extsrv/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            params.name = decodeURIComponent(params.name)
            params.url = decodeURIComponent(params.url)
            params.type = decodeURIComponent(params.type)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSExtsrv = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'extsrv/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('extsrvHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/extsrv_hapus.html'
    };
}]);

nodeManager.directive('extsrvEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/extsrv_edit.html'
    };
}]);


nodeManager.controller('BasemapsCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
        $scope.kodesimpul = data;
    });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.basemaps = [];

    $http.get(CONFIG.api_url + 'basemaps/list').success(function(data) {
        $scope.basemaps = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.basemaps.length / $scope.pageSize);
        }
    });

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.uploadBerkasLogo = function($files) {
        // console.log('INIT');
        // console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        //     var $file = $files[i];
        //     (function(index) {
        //         $scope.berkas_logo = encodeImageFileAsURL($file);
        //     })(i);
        // }
        // console.log($scope.berkas_logo);
    }

    var HapusBasemapsDialogModel = function() {
        this.visible = false;
    };

    HapusBasemapsDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusBasemapsDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditBasemapsDialogModel = function() {
        this.visible = false;
    };

    EditBasemapsDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EditBasemapsDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoBasemapsDialogModel = function() {
        this.visible = false;
    };


    $scope.hapusBasemaps = new HapusBasemapsDialogModel();
    $scope.editBasemaps = new EditBasemapsDialogModel();
    $scope.basemapsentry = {}
    $scope.basemapsentry.basemaps = ''

    $scope.tambahGSBasemaps = function() {
        var params = $scope.basemapsentry;
        params.name = encodeURIComponent(params.name)
        params.url = encodeURIComponent(params.url)
        params.type = encodeURIComponent(params.type)
        params.params = encodeURIComponent(params.params)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'basemaps/add', data).success(function(data, status) {
            pesan = data;
            params.name = decodeURIComponent(params.name)
            params.url = decodeURIComponent(params.url)
            params.type = decodeURIComponent(params.type)
            params.params = decodeURIComponent(params.params)
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSBasemaps = function(item) {
        var params = item;
        params.name = encodeURIComponent(params.name)
        params.url = encodeURIComponent(params.url)
        params.type = encodeURIComponent(params.type)
        params.params = encodeURIComponent(params.params)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'basemaps/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            params.name = decodeURIComponent(params.name)
            params.url = decodeURIComponent(params.url)
            params.type = decodeURIComponent(params.type)
            params.params = decodeURIComponent(params.params)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSBasemaps = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'basemaps/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('basemapsHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/basemaps_hapus.html'
    };
}]);

nodeManager.directive('basemapsEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/basemaps_edit.html'
    };
}]);

nodeManager.controller('PhotosCtrl', function($rootScope, $scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    // $http.get(CONFIG.api_url + 'kodesimpul', { cache: true }).success(function(data) {
    //     $scope.kodesimpul = data;
    // });

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';
    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.photosentry = {}

    $scope.tambahGSPhotos = function() {
        var params = $scope.photosentry;
        // console.log(params)
        params.lon = $("#lon").text();
        params.lat = $("#lat").text();
        params.nama = encodeURIComponent($("#photosentrynama").val())
        params.remark = encodeURIComponent($("#photosentryremark").val())
        params.photo = $scope.berkas_logo
        params.uploader = $rootScope.currentUser['user']
        params.ugroup = $rootScope.currentUser['grup']
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'photos/add', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG);
            refreshOL();
        })
    }

    $scope.hapusGSPhotos = function() {
        params = {}
        params.id = $("#idphoto").text()
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'photos/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG);
            refreshOL();
        })
    }

});

nodeManager.controller('LinkwebCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.linkweb = [];

    $http.get(CONFIG.api_url + 'linkweb/list').success(function(data) {
        $scope.linkweb = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.linkweb.length / $scope.pageSize);
        }
    });

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.uploadBerkasLogo = function($files) {
        // console.log('INIT');
        // console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        //     var $file = $files[i];
        //     (function(index) {
        //         $scope.berkas_logo = encodeImageFileAsURL($file);
        //     })(i);
        // }
        // console.log($scope.berkas_logo);
    }

    var HapusLinkwebDialogModel = function() {
        this.visible = false;
    };

    HapusLinkwebDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusLinkwebDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditLinkwebDialogModel = function() {
        this.visible = false;
    };

    EditLinkwebDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    EditLinkwebDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoLinkwebDialogModel = function() {
        this.visible = false;
    };


    $scope.hapusLinkweb = new HapusLinkwebDialogModel();
    $scope.editLinkweb = new EditLinkwebDialogModel();
    $scope.linkwebentry = {}
    $scope.linkwebentry.nama = ''

    $scope.tambahGSLinkweb = function() {
        var params = $scope.linkwebentry;
        params.nama = encodeURIComponent(params.nama)
        params.url = encodeURIComponent(params.url)
        params.image = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'linkweb/add', data).success(function(data, status) {
            pesan = data;
            params.nama = decodeURIComponent(params.nama)
            params.url = decodeURIComponent(params.url)
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSLinkweb = function(item) {
        var params = item;
        params.nama = encodeURIComponent(params.nama)
        params.url = encodeURIComponent(params.url)
        params.image = $scope.berkas_logo;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'linkweb/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            params.nama = decodeURIComponent(params.nama)
            params.url = decodeURIComponent(params.url)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSLinkweb = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'linkweb/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('linkwebHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/linkweb_hapus.html'
    };
}]);

nodeManager.directive('linkwebEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/linkweb_edit.html'
    };
}]);

nodeManager.controller('KontakCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.kontak = [];

    $http.get(CONFIG.api_url + 'kontak/list').success(function(data) {
        $scope.kontak = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.kontak.length / $scope.pageSize);
        }
    });


    var HapusKontakDialogModel = function() {
        this.visible = false;
    };

    HapusKontakDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusKontakDialogModel.prototype.close = function() {
        this.visible = false;
    };

    $scope.hapusKontak = new HapusKontakDialogModel();
    $scope.kontakentry = {}
    $scope.kontakentry.kontak = ''

    $scope.hapusGSKontak = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'kontak/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('kontakHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/kontak_hapus.html'
    };
}]);

var editisi;

nodeManager.controller('BeritaCtrl', function($scope, CONFIG, $http, $state, $stateParams, $upload, $timeout, $uibModal, USER_ROLES) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.cariPengguna = ''; // set the default search/filter term
    // create the list of sushi rolls 

    $scope.reloadView = function() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.berita = [];

    $http.get(CONFIG.api_url + 'berita/listall').success(function(data) {
        $scope.berita = data;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.berita.length / $scope.pageSize);
        }
    });

    $scope.upload_logo = [];
    // $scope.berkas_logo = '';

    $scope.uploadLogo = function($files) {
        $scope.logoFile = $files;
        console.log($scope.logoFile);
        // $scope.berkas_logo = encodeImageFileAsURL($files);
        var reader = new FileReader();
        reader.readAsDataURL($files[0])
        reader.onloadend = function() {
            $scope.berkas_logo = reader.result;
            console.log($scope.berkas_logo);
        }
    }

    $scope.uploadBerkasLogo = function($files) {
        // console.log('INIT');
        // console.log($files);
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        //     var $file = $files[i];
        //     (function(index) {
        //         $scope.berkas_logo = encodeImageFileAsURL($file);
        //     })(i);
        // }
        // console.log($scope.berkas_logo);
    }

    var HapusBeritaDialogModel = function() {
        this.visible = false;
    };

    HapusBeritaDialogModel.prototype.open = function(item) {
        this.item = item;
        console.log(item);
        this.visible = true;
    };

    HapusBeritaDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var EditBeritaDialogModel = function() {
        this.visible = false;
    };

    EditBeritaDialogModel.prototype.open = function(item) {
        this.item = item;
        this.item.tgl = new Date(item.tanggal)
        console.log(item);
        window.editisi = this.item.isiberita;
        this.visible = true;
    };

    EditBeritaDialogModel.prototype.close = function() {
        this.visible = false;
    };

    var InfoBeritaDialogModel = function() {
        this.visible = false;
    };


    $scope.hapusBerita = new HapusBeritaDialogModel();
    $scope.editBerita = new EditBeritaDialogModel();
    $scope.beritaentry = {}
        // $scope.beritaentry.nama = ''

    $scope.tambahGSBerita = function() {
        var params = $scope.beritaentry;
        params.judul = encodeURIComponent(params.judul)
        markupStr = $('#isiberita').summernote('code');
        params.isiberita = encodeURIComponent(markupStr)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'berita/add', data).success(function(data, status) {
            pesan = data;
            $scope.beritaentry.judul = decodeURIComponent(params.judul)
            markupStr = $('#isiberita').summernote('code');
            $scope.beritaentry.isiberita = decodeURIComponent(markupStr)
            bootbox.alert(pesan.MSG)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.editGSBerita = function(item) {
        var params = item;
        params.judul = encodeURIComponent(params.judul)
        markupStr = $('#editisiberita').summernote('code');
        params.isiberita = encodeURIComponent(markupStr)
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'berita/edit', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
            params.nama = decodeURIComponent(params.nama)
            params.url = decodeURIComponent(params.url)
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });
        })
    }

    $scope.hapusGSBerita = function() {
        var params = $scope.model.item;
        console.log(params)
        var data = $.param({
            json: JSON.stringify({
                pubdata: params
            })
        });
        $http.post(CONFIG.api_url + 'berita/delete', data).success(function(data, status) {
            pesan = data;
            bootbox.alert(pesan.MSG)
        })
    }

});

nodeManager.directive('beritaHapusDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = true;
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/berita_hapus.html'
    };
}]);

nodeManager.directive('beritaEditDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function(scope, element, attributes) {
            scope.$watch('model.visible', function(newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });
            element.on('shown.bs.modal', function() {
                console.log(scope.model);
                $('#editisiberita').summernote('destroy');
                $('#editisiberita').empty();
                $('#editisiberita').append(scope.model.item.isiberita);
                $('#editisiberita').summernote({
                    height: 430
                });
                scope.$apply(function() {
                    scope.model.visible = true;
                    // $('#editisiberita').summernote('code', $('#isinyaberita').html());
                });
            });
            element.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'templates/berita_edit.html'
    };
}]);