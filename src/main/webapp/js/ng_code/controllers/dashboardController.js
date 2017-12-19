angular
    .module('spheresuite')
    .controller('dashboardController', dashboardController);

dashboardController.$inject = ['$scope', '$rootScope','$location', '$localStorage', '$filter', 'dashboardService', 'leadService', 'commonService', 'employeeService', 'userService', 'opportunityService', '$interval'];

function dashboardController($scope, $rootScope,$location, $localStorage, $filter, dashboardService, leadService, commonService, employeeService, userService, opportunityService, $interval) {
    var dashboardControllerScope = this;
    $rootScope.headerMenu = "Dashboard";

    dashboardControllerScope.taskForm;

    dashboardControllerScope.task =  { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm')}; 
    dashboardControllerScope.calendar = { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm')}; 
    dashboardControllerScope.calendarForm;
    dashboardControllerScope.calendarPendingList;
    dashboardControllerScope.employeeLength = 0;
    dashboardControllerScope.activeUser = 0;
    dashboardControllerScope.inActiveUser = 0;
    dashboardControllerScope.format = "YYYY-MM-DD";
    dashboardControllerScope.yearFormat = "YYYY";
    dashboardControllerScope.taskPendingList;
    dashboardControllerScope.myLeadsChart;
    dashboardControllerScope.myLeadsChartForm;
    dashboardControllerScope.myCustomersChart;
    dashboardControllerScope.myCustomersChartForm;
    dashboardControllerScope.employeeChart;
    dashboardControllerScope.employeeChartForm;
    dashboardControllerScope.leadsReportChart;
    dashboardControllerScope.leadsReportChartForm;
    dashboardControllerScope.employeeList;
    dashboardControllerScope.hour = [];
    dashboardControllerScope.min = [];
    
    $(".select1").select2();

    dashboardControllerScope.addTask = addTask;
    dashboardControllerScope.addCalendar = addCalendar;
    dashboardControllerScope.checkMailAddressForMailbox = checkMailAddressForMailbox;
    dashboardControllerScope.declineTask = declineTask;
    dashboardControllerScope.getTask = getTask;
    dashboardControllerScope.getMyLeadsChartDetails = getMyLeadsChartDetails;
    dashboardControllerScope.getCalendarUpcoming = getCalendarUpcoming;
    dashboardControllerScope.getMyCustomersChartDetails = getMyCustomersChartDetails;
    dashboardControllerScope.getCustomersReportChartDetails = getCustomersReportChartDetails;
    dashboardControllerScope.getLeadsReportChartDetails = getLeadsReportChartDetails;
    dashboardControllerScope.getMySalesReportChartDetails = getMySalesReportChartDetails;
    dashboardControllerScope.getSalesReportChartDetails = getSalesReportChartDetails;
    dashboardControllerScope.getSalesStageChartDetails = getSalesStageChartDetails;
    dashboardControllerScope.updateTaskStatus = updateTaskStatus;
    dashboardControllerScope.getEmployee = getEmployee;
    dashboardControllerScope.addAttendee = addAttendee;
    dashboardControllerScope.leadPage =  leadPage;
    dashboardControllerScope.customerPage =  customerPage;
    dashboardControllerScope.leadDetail = leadDetail;
    dashboardControllerScope.callAtInterval = callAtInterval
    function callAtInterval() {
        if($location.path()=='/dashboard'){
            checkMailAddressForMailbox();
            getMyLeadsChartDetails();
            getMyCustomersChartDetails();
            getLeadsReportChartDetails();
            getCustomersReportChartDetails();
            getMySalesReportChartDetails();
            getSalesReportChartDetails();
            getSalesStageChartDetails();
            getCalendarUpcoming();
            getTask();
            getUser();
        }
    }
    $interval( function(){ callAtInterval(); }, 60000);

    function leadPage() {
    	$location.path('/leads')
    }
    
    function customerPage() {
    	$location.path('/customers')
    }
    
    var date = new Date();
    var nextYearDate = new Date();
    nextYearDate = nextYearDate.setYear(date.getFullYear() + 1);
    
    dashboardControllerScope.myLeadsChart = { fromDate: new Date(date.getFullYear(), date.getMonth(), 1), toDate: new Date() };
    dashboardControllerScope.myCustomersChart = { fromDate: new Date(date.getFullYear(), date.getMonth(), 1), toDate: new Date() };
    dashboardControllerScope.leadsReportChart = { fromDate: new Date(date.getFullYear(), date.getMonth(), 1), toDate: new Date() };
    dashboardControllerScope.customersReportChart = { fromDate: new Date(date.getFullYear(), date.getMonth(), 1), toDate: new Date() };
    dashboardControllerScope.salesTargetReportChart = { fromDate: moment(new Date()).get('year'), toDate: moment(nextYearDate).get('year') };
    dashboardControllerScope.mySalesTargetReportChart = { fromDate: moment(new Date()).get('year'), toDate: moment(nextYearDate).get('year') };
    
    dashboardControllerScope.myLeadsChartCount = 0;
    dashboardControllerScope.myCustomersChartCount = 0;
    dashboardControllerScope.leadsReportChartCount = 0;
    dashboardControllerScope.customersReportChartCount = 0;
    dashboardControllerScope.salesTargetReportChartCount = 0;
    dashboardControllerScope.mySalesTargetReportChartCount = 0;

    checkMailAddressForMailbox();
    getMyLeadsChartDetails();
    getMyCustomersChartDetails();
    getLeadsReportChartDetails();
    getCustomersReportChartDetails();
    getMySalesReportChartDetails();
    getSalesReportChartDetails();
    getSalesStageChartDetails();
    getCalendarUpcoming();
    getTask();
    getUser();
   
   function leadDetail(lead) {
        if (lead) {
            $localStorage.spheresuite.leadId = lead;
            $location.path('/lead/view');
        } 
   }
    function addTask() {
        if (dashboardControllerScope.task) {
            dashboardControllerScope.spinner = true;
            commonService.formValNotManditory(dashboardControllerScope.taskForm, dashboardControllerScope.task).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.time = data.hour + ' : ' + data.min;
                        data.leadId = "";
                        leadService.addTask(data).then(function(res) {
                        if (res.successflag == 'true') {
                            $('#task').modal('hide');
                            getTask();
                            declineTask();
                            dashboardControllerScope.spinner = false;
                        } else {}
                    }, function(err) {
                        dashboardControllerScope.spinner = false;
                    });
                } else {}
            }, function(err) {
                dashboardControllerScope.spinner = false;
            });
        }
    }


    function addAttendee(attendee) {
        if (attendee && dashboardControllerScope.calendar && dashboardControllerScope.calendar.contactList) {
            if (dashboardControllerScope.calendar.contactList.indexOf(attendee) == -1)
                dashboardControllerScope.calendar.contactList.push(attendee);
        } else if (attendee) {
            if (!dashboardControllerScope.calendar) {
                dashboardControllerScope.calendar = { contactList: [] };
                dashboardControllerScope.calendar.contactList.push(attendee);
            } else if (dashboardControllerScope.calendar && !dashboardControllerScope.calendar.contactList) {
                dashboardControllerScope.calendar.contactList = [];
                dashboardControllerScope.calendar.contactList.push(attendee);
            }
        }
        dashboardControllerScope.email = '';
    }


    for(i = 0; i<24; i++){
    	if(i<10){
    		 dashboardControllerScope.hour.push('0'+i);
    	}else {
    		 dashboardControllerScope.hour.push(i);
    	}
    }
    
    for(i = 0; i<60; i++){
    	if(i<10){
    		 dashboardControllerScope.min.push('0'+i);
    	}else {
    		 dashboardControllerScope.min.push(i);
    	}
    }
    
    function addCalendar() {
        if (dashboardControllerScope.calendar) {
            dashboardControllerScope.spinnerCalendar = true;
            commonService.formValNotManditory(dashboardControllerScope.calendarForm, dashboardControllerScope.calendar).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.leadId = "";
                    data.time = data.hour + ' : ' + data.min;
                    leadService.addSchedule(data).then(function(res) { 
                        if (res.successflag == 'true') {
                            $('#calendar').modal('hide');
                            getCalendarUpcoming();
                            declineTask();
                        } 
                        dashboardControllerScope.spinnerCalendar = false;
                    }, function(err) {
                        dashboardControllerScope.spinnerCalendar = false;
                    });
                } else {}
            }, function(err) {
                dashboardControllerScope.spinnerCalendar = false;
            });
        }
    }
        
    function checkMailAddressForMailbox(){
    	if($localStorage.spheresuite && $localStorage.spheresuite.id != ''){
    		employeeService.getEmployee($localStorage.spheresuite.id).then(function(res){
    			if(res && res.successflag == 'true' && res.results.length > 0){
    				if(res.results[0].email != '' && res.results[0].password != ''){
    					$rootScope.configuremail = true;
    				}else {
            	    	$rootScope.configuremail = false;
    				}
    			}else{
    				$rootScope.configuremail = false;
    			}
    		},function(err){
    			$rootScope.configuremail = false;
    		});
    	}
    }

    function declineTask() {
        dashboardControllerScope.task = null;
        dashboardControllerScope.taskForm.$setPristine();
        dashboardControllerScope.taskForm.$setUntouched(); 
        dashboardControllerScope.task =  { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm')}; 
        $("#hour").val(moment().format('HH')).trigger('change.select2');
        $("#min").val(moment().format('mm')).trigger('change.select2');
        dashboardControllerScope.calendar = null;
        dashboardControllerScope.calendar = { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm')};
        $("#calenderHour").val(moment().format('HH')).trigger('change.select2');
        $("#calenderMin").val(moment().format('mm')).trigger('change.select2');
        dashboardControllerScope.calendarForm.$setPristine();
        dashboardControllerScope.calendarForm.$setUntouched();

    }

    function getCalendarUpcoming() {
        dashboardControllerScope.spinnerCalendar = true;
        data = $localStorage.spheresuite.id;
        leadService.getCalendarUpcoming(data).then(function(res) {
            if (res.successflag === 'true' && res.results.length >= 0) {
                dashboardControllerScope.calendarList = res.results;
                dashboardControllerScope.spinnerCalendar = false;
            } else {
                dashboardControllerScope.spinnerCalendar = false;
            }
        }, function(err) {
            dashboardControllerScope.spinnerCalendar = false;
        });
    }

    getEmployee();

    function getEmployee() {
        dashboardControllerScope.spinnerEmployee = true;
        employeeService.getEmployee().then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {
                dashboardControllerScope.employeeList = angular.copy(res.results);
                dashboardControllerScope.spinnerEmployee = false;
            } else {
                dashboardControllerScope.spinnerEmployee = false;
            }
        }, function(err) {
            dashboardControllerScope.spinnerEmployee = false;
        });
    }


    dashboardControllerScope.myLeadsChartList = {};

    dashboardControllerScope.myLeadsChartListLength = 0;

    function getMyLeadsChartDetails() { 
        dashboardControllerScope.spinnerLead = true;
        dashboardControllerScope.myLeadsChart.fromDate = $filter('date')(dashboardControllerScope.myLeadsChart.fromDate, 'yyyy-MM-dd');
        dashboardControllerScope.myLeadsChart.toDate = $filter('date')(dashboardControllerScope.myLeadsChart.toDate, 'yyyy-MM-dd');
        dashboardControllerScope.myLeadsChart.empId = $localStorage.spheresuite.id;
        var count = dashboardControllerScope.myLeadsChartCount += 1;
        if (dashboardControllerScope.myLeadsChart.fromDate && dashboardControllerScope.myLeadsChart.toDate && count != 2 && count != 3) { 
            dashboardControllerScope.myLeadsChartListLength = 0; 
            leadService.getMyLeadsChartDetailsByEmp(dashboardControllerScope.myLeadsChart).then(function(res) {  
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.myLeadsChartList = res.results[0]; 
                    dashboardControllerScope.spinnerLead = false;
                    google.charts.load("current", { packages: ["corechart"] });
                    google.charts.setOnLoadCallback(drawLeadChart);
                    var hot = parseInt(dashboardControllerScope.myLeadsChartList.hot);
                    var cold = parseInt(dashboardControllerScope.myLeadsChartList.cold);
                    var warm = parseInt(dashboardControllerScope.myLeadsChartList.warm);
                    dashboardControllerScope.myLeadsChartListLength = hot + cold + warm;
                    console.log('myLeadsChartListLength === ', dashboardControllerScope.myLeadsChart)

                    function drawLeadChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['Hot ', hot],
                            ['Warm', warm],
                            ['Cold', cold]
                        ]);
                        var options = {
                            title: '',
                            is3D: true,
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('myLeadsChartContainer'));
                        chart.draw(data, options);
                    }

                } else {
                    dashboardControllerScope.spinnerLead = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerLead = false;
            });
        } else {
            dashboardControllerScope.spinnerLead = false;
        }
    }


    dashboardControllerScope.leadsReportChartList = {};

    dashboardControllerScope.leadsReportChartListLength = 0;

    function getLeadsReportChartDetails() {
        dashboardControllerScope.spinnerEmployee = true;
        var count = dashboardControllerScope.leadsReportChartCount += 1;
        dashboardControllerScope.leadsReportChart.fromDate = $filter('date')(dashboardControllerScope.leadsReportChart.fromDate, 'yyyy-MM-dd');
        dashboardControllerScope.leadsReportChart.toDate = $filter('date')(dashboardControllerScope.leadsReportChart.toDate, 'yyyy-MM-dd');
        if (!dashboardControllerScope.leadsReportChart.empId)
            dashboardControllerScope.leadsReportChart.empId = "";
        if (dashboardControllerScope.leadsReportChart.fromDate && dashboardControllerScope.leadsReportChart.toDate && count != 2 && count != 3) {
            dashboardControllerScope.leadsReportChartListLength = 0;
            leadService.getMyLeadsChartDetailsByEmp(dashboardControllerScope.leadsReportChart).then(function(res) {
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.spinnerEmployee = false;
                    dashboardControllerScope.leadsReportChartList = res.results[0];
                    google.charts.load("current", { packages: ["corechart"] });
                    google.charts.setOnLoadCallback(drawLeadChart);
                    var hot = parseInt(dashboardControllerScope.leadsReportChartList.hot);
                    var cold = parseInt(dashboardControllerScope.leadsReportChartList.cold);
                    var warm = parseInt(dashboardControllerScope.leadsReportChartList.warm);
                    dashboardControllerScope.leadsReportChartListLength = hot + cold + warm;

                    function drawLeadChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['Hot ', hot],
                            ['Warm', warm],
                            ['Cold', cold]
                        ]);
                        var options = {
                            title: '',
                            is3D: true,
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('leadsReportChartContainer'));
                        chart.draw(data, options);
                        google.visualization.events.addListener(chart, 'select', selectHandler);
                        function selectHandler() {   
                        	$location.path('/leads')
                            }  
                    }

                } else {
                    dashboardControllerScope.spinnerEmployee = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerEmployee = false;
            });
        } else {
            dashboardControllerScope.spinnerEmployee = false;
        }
    }


    dashboardControllerScope.myCustomersChartList = {};

    dashboardControllerScope.myCustomersChartListLength = 0;

    function getMyCustomersChartDetails() {
        var count = dashboardControllerScope.myCustomersChartCount += 1;
        dashboardControllerScope.myCustomersChart.fromDate = $filter('date')(dashboardControllerScope.myCustomersChart.fromDate, 'yyyy-MM-dd');
        dashboardControllerScope.myCustomersChart.toDate = $filter('date')(dashboardControllerScope.myCustomersChart.toDate, 'yyyy-MM-dd');
        if (!dashboardControllerScope.myCustomersChart.empId)
            dashboardControllerScope.myCustomersChart.empId = $localStorage.spheresuite.id;
        if (dashboardControllerScope.myCustomersChart.fromDate && dashboardControllerScope.myCustomersChart.toDate && count != 2 && count != 3) {
            dashboardControllerScope.spinnerCustomer = true;
            dashboardControllerScope.myCustomersChartListLength = 0; 
            leadService.getMyCustomersChartDetails(dashboardControllerScope.myCustomersChart).then(function(res) {
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.spinnerCustomer = false;
                    dashboardControllerScope.myCustomersChartList = res.results[0];
                    google.charts.load("current", { packages: ["corechart"] });
                    google.charts.setOnLoadCallback(drawCustomerChart);
                    var oldCustomers = parseInt(dashboardControllerScope.myCustomersChartList.totalCustomer);
                    var newCustomer = parseInt(dashboardControllerScope.myCustomersChartList.newCustomer);

                    dashboardControllerScope.myCustomersChartListLength = newCustomer + oldCustomers;

                    function drawCustomerChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['New Customers ', newCustomer],
                            ['Old Customers', oldCustomers]
                        ]); 
                        var options = {
                            title: '',
                            is3D: true,
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('myCustomersChartContainer'));
                        chart.draw(data, options);  
                    }

                } else {
                    dashboardControllerScope.spinnerCustomer = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerCustomer = false;
            });
        } else {
            dashboardControllerScope.spinnerCustomer = false;
        }
    }

    dashboardControllerScope.customersReportChartList = {};

    dashboardControllerScope.customersReportChartListLength = 0;

    function getCustomersReportChartDetails() {
        dashboardControllerScope.spinnerCustomerReport = true;
        var count = dashboardControllerScope.customersReportChartCount += 1;
        dashboardControllerScope.customersReportChart.fromDate = $filter('date')(dashboardControllerScope.customersReportChart.fromDate, 'yyyy-MM-dd');
        dashboardControllerScope.customersReportChart.toDate = $filter('date')(dashboardControllerScope.customersReportChart.toDate, 'yyyy-MM-dd');
        if (!dashboardControllerScope.customersReportChart.empId)
            dashboardControllerScope.customersReportChart.empId = "";
        if (dashboardControllerScope.customersReportChart.fromDate && dashboardControllerScope.customersReportChart.toDate && count != 2 && count != 3) {
            dashboardControllerScope.customersReportChartListLength = 0; 
            leadService.getMyCustomersChartDetails(dashboardControllerScope.customersReportChart).then(function(res) {
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.spinnerCustomerReport = false;
                    dashboardControllerScope.customersReportChartList = res.results[0];
                    google.charts.load("current", { packages: ["corechart"] });
                    google.charts.setOnLoadCallback(drawCustomerChart);
                    var oldCustomers = parseInt(dashboardControllerScope.customersReportChartList.totalCustomer);
                    var newCustomer = parseInt(dashboardControllerScope.customersReportChartList.newCustomer);

                    dashboardControllerScope.customersReportChartListLength = newCustomer + oldCustomers;

                    function drawCustomerChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['New Customers ', newCustomer],
                            ['Old Customers', oldCustomers]
                        ]);

                        var options = {
                            title: '',
                            is3D: true,
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('customersReportChartContainer'));
                        chart.draw(data, options);
                        google.visualization.events.addListener(chart, 'select', selectHandler);
                        function selectHandler() {    
                        	$location.path('/customers')
                            }  
                    }

                } else {
                    dashboardControllerScope.spinnerCustomerReport = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerCustomerReport = false;
            });
        } else {
            dashboardControllerScope.spinnerCustomerReport = false;
        }
    }


    dashboardControllerScope.mySalesTargetReportChartList = {}; 
    dashboardControllerScope.mySalesTargetReportChartListLength = 0;

    function getMySalesReportChartDetails() {
        dashboardControllerScope.spinnerMySalesTargetReport = true;
        var count = dashboardControllerScope.mySalesTargetReportChartCount += 1;
        dashboardControllerScope.mySalesTargetReportChart.empId = $localStorage.spheresuite.id;
        if (dashboardControllerScope.mySalesTargetReportChart.fromDate && dashboardControllerScope.mySalesTargetReportChart.toDate && count != 2 && count != 3) {
            dashboardControllerScope.mySalesTargetReportChartListLength = 0;
            leadService.getMySalesReportChartDetails(dashboardControllerScope.mySalesTargetReportChart).then(function(res) { 
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.spinnerMySalesTargetReport = false;
                    dashboardControllerScope.mySalesTargetReportChartList = res.results;
                    dashboardControllerScope.mySalesTargetReportChartListLength = dashboardControllerScope.mySalesTargetReportChartList.length;

                    var year = ['Year'];
                    var q1 = ['Q1'];
                    var q2 = ['Q2'];
                    var q3 = ['Q3'];
                    var q4 = ['Q4'];
                    var startDate = parseInt(dashboardControllerScope.mySalesTargetReportChart.fromDate);

                    angular.forEach(dashboardControllerScope.mySalesTargetReportChartList, function(val) {
                    	var foundSameYear = false;
                    	angular.forEach(year,function(yearVal, key){
                    		if(yearVal == (val.fromDate + ' - ' + (parseFloat(val.fromDate) + 1))){
                    			q1[key] = parseFloat(q1[key]) + parseFloat(val.q1);
                    			q2[key] = parseFloat(q1[key]) + parseFloat(val.q2);
                    			q3[key] = parseFloat(q1[key]) + parseFloat(val.q3);
                    			q4[key] = parseFloat(q1[key]) + parseFloat(val.q4);
                    			foundSameYear = true;
                    		}
                    	})
                    	if(!foundSameYear){
	                        year.push(startDate + ' - ' + (startDate + 1));
	                        q1.push(parseFloat(val.q1));
	                        q2.push(parseFloat(val.q2));
	                        q3.push(parseFloat(val.q3));
	                        q4.push(parseFloat(val.q4));
	                        startDate += 1;
                        }
                    })


                    google.charts.load('current', { packages: ['corechart', 'bar'] });
                    google.charts.setOnLoadCallback(drawAxisTickColors);

                    function drawAxisTickColors() {
                        var data = google.visualization.arrayToDataTable([
                            year,
                            q1,
                            q2,
                            q3,
                            q4
                        ]);

                        var options = {
                            title: 'My Sales Target Report',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Quarter',
                                minValue: 0,
                                textStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                },
                                titleTextStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                }
                            },
                            vAxis: {
                                title: 'Sales Target',
                                textStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                },
                                titleTextStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                }
                            }
                        };
                        var chart = new google.visualization.ColumnChart(document.getElementById('mySalesReportChartContainer'));
                        chart.draw(data, options);
                    }

                } else {
                    dashboardControllerScope.spinnerMySalesTargetReport = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerMySalesTargetReport = false;
            });
        } else {
            dashboardControllerScope.spinnerMySalesTargetReport = false;
        }
    }


    dashboardControllerScope.salesTargetReportChartList = {};

    dashboardControllerScope.salesTargetReportChartListLength = 0;

    function getSalesReportChartDetails() {
        dashboardControllerScope.spinnerSalesTargetReport = true;
        var count = dashboardControllerScope.salesTargetReportChartCount += 1;
        if (!dashboardControllerScope.salesTargetReportChart.empId)
            dashboardControllerScope.salesTargetReportChart.empId = "";
        if (dashboardControllerScope.salesTargetReportChart.fromDate && dashboardControllerScope.salesTargetReportChart.toDate && count != 2 && count != 3) {
            dashboardControllerScope.salesTargetReportChartListLength = 0;
            leadService.getMySalesReportChartDetails(dashboardControllerScope.salesTargetReportChart).then(function(res) {
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.spinnerSalesTargetReport = false;
                    dashboardControllerScope.salesTargetReportChartList = res.results;
                    dashboardControllerScope.salesTargetReportChartListLength = dashboardControllerScope.salesTargetReportChartList.length;

                    var year = ['Year'];
                    var q1 = ['Q1'];
                    var q2 = ['Q2'];
                    var q3 = ['Q3'];
                    var q4 = ['Q4'];
                    var startDate = parseInt(dashboardControllerScope.salesTargetReportChart.fromDate);
             angular.forEach(dashboardControllerScope.salesTargetReportChartList, function(val) {
                    	var foundSameYear = false;
                    	angular.forEach(year,function(yearVal, key){
                    		if(yearVal == (val.fromDate + ' - ' + (parseFloat(val.fromDate) + 1))){
                    			q1[key] = parseFloat(q1[key]) + parseFloat(val.q1);
                    			q2[key] = parseFloat(q1[key]) + parseFloat(val.q2);
                    			q3[key] = parseFloat(q1[key]) + parseFloat(val.q3);
                    			q4[key] = parseFloat(q1[key]) + parseFloat(val.q4);
                    			foundSameYear = true;
                    		}
                    	})
                    	if(!foundSameYear){
	                        year.push(startDate + ' - ' + (startDate + 1));
	                        q1.push(parseFloat(val.q1));
	                        q2.push(parseFloat(val.q2));
	                        q3.push(parseFloat(val.q3));
	                        q4.push(parseFloat(val.q4));
	                        startDate += 1;
                        }
                    })


                    google.charts.load('current', { packages: ['corechart', 'bar'] });
                    google.charts.setOnLoadCallback(drawAxisTickColors);

                    function drawAxisTickColors() {
                        var data = google.visualization.arrayToDataTable([
                            year,
                            q1,
                            q2,
                            q3,
                            q4
                        ]);

                        var options = {
                            title: 'Sales Target Report',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Quarter',
                                minValue: 0,
                                textStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                },
                                titleTextStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                }
                            },
                            vAxis: {
                                title: 'Sales Target',
                                textStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                },
                                titleTextStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                }
                            }
                        };
                        var chart = new google.visualization.ColumnChart(document.getElementById('salesReportChartContainer'));
                        chart.draw(data, options);
                    }

                } else {
                    dashboardControllerScope.spinnerSalesTargetReport = false;
                }
            }, function(err) {
                dashboardControllerScope.spinnerSalesTargetReport = false;
            });
        } else {
            dashboardControllerScope.spinnerSalesTargetReport = false;
        }
    }
    
    

    dashboardControllerScope.salesStageReportChartList = {};
    dashboardControllerScope.isSalesStage = true;


    function getSalesStageChartDetails () {
        dashboardControllerScope.spinnerSalesStageReport = true;
            dashboardControllerScope.isSalesStage = true;
            opportunityService.getSalesStageReportChartDetails().then(function(res) {
            	console.log("http://dev.spheresuite.com/api/opportunity/retrieveAll/",res)
                if (res.successflag === 'true' && res.results.length > 0) {
                    dashboardControllerScope.salesStageReportChartList = res.results;

                    var name = ['Name'];
                    var value = ['Sales Stage'];
                    
                    angular.forEach(dashboardControllerScope.salesStageReportChartList, function(val, key){
                    	name.push(val.name);
                    	value.push(Number(val.value));
                    });
                    console.log(name)
                    console.log("value",value)
                    google.charts.load('current', { packages: ['corechart', 'bar'] });
                    google.charts.setOnLoadCallback(drawAxisTickColors);

                    function drawAxisTickColors() {
                        var data = google.visualization.arrayToDataTable([
                            name,
                            value
                        ]);
                       
                        var options = {
                            title: 'Sales Stage Report',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: '',
                                minValue: 0,
                                textStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                },
                                titleTextStyle: {
                                    bold: true,
                                    fontSize: 11,
                                    color: '#4d4d4d'
                                }
                            },
                            vAxis: {
                                title: 'Value',
                                textStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                },
                                titleTextStyle: {
                                    fontSize: 11,
                                    bold: true,
                                    color: '#848484'
                                }
                            }, legend: { position: 'bottom' } 
                        };

                      
                        var chart = new google.visualization.ColumnChart(document.getElementById('salesStageChartContainer'));  
                        google.visualization.events.addListener(chart, 'select', selectHandler);

                        function selectHandler() { 
                        var selection = chart.getSelection();
                        var message = '';
                        for (var i = 0; i < selection.length; i++) { 
                            dashboardControllerScope.spinner = true;
                        var item = selection[i]; 
                        $localStorage.spheresuite.salesTargetFilter = name[item.column]; 
                        console.log("item lead",item)
                        $location.path('/opportunities');
                       /* var str = data.getFormattedValue(item.row, item.column);
                        var category = data
                        .getValue(chart.getSelection()[0].row, 0)*/
                        }
                        } 
                    
                       chart.draw(data, options); 
                        dashboardControllerScope.spinnerSalesStageReport = false;                       
                    }

                } else {
                    dashboardControllerScope.isSalesStage = false;
                    dashboardControllerScope.spinnerSalesStageReport = false;
                }
            }, function(err) {
                dashboardControllerScope.isSalesStage = false;
                dashboardControllerScope.spinnerSalesStageReport = false;
            });
    }


    function getTask() {
        dashboardControllerScope.spinnerTask = true;
        leadService.getTask().then(function(res) {
            if (res.successflag === 'true' && res.results.length >= 0) {
                dashboardControllerScope.taskPendingList = res.results;
                dashboardControllerScope.spinnerTask = false;
            } else {
                dashboardControllerScope.spinnerTask = false;
            }
        }, function(err) {
            dashboardControllerScope.spinnerTask = false;
        });

    }
    
    function getUser(){
        dashboardControllerScope.spinnerEmployee = false;
    	userService.getUser().then(function(res) { 
            if (res.successflag == 'true' && res.results.length > 0) {
            	var activeUser = 0, inActiveUser = 0
                angular.forEach(res.results,function(val){
                	if(val.status == 'a') {
                		activeUser++;
                	}else if((val.status != 'p')){
                		inActiveUser++;
                	}
                });
            	dashboardControllerScope.activeUser = activeUser;
            	dashboardControllerScope.inActiveUser = inActiveUser;
            	dashboardControllerScope.employeeLength = activeUser + inActiveUser;
                dashboardControllerScope.spinnerEmployee = false;
            } else {
            	dashboardControllerScope.spinnerEmployee = false;
            }
        }, function(err) { 
        	dashboardControllerScope.spinnerEmployee = false;	
        });
    }


    function updateTaskStatus(data) {
        var data = {
            id: data,
            status: "D",
            updatedBy: $localStorage.spheresuite.id

        }
        leadService.editTaskStatus(data).then(function(res) {
            if (res.successflag === 'true') {
                getTask();
                if (dashboardControllerScope.taskPendingList.length == 1) {
                    dashboardControllerScope.taskPendingList = null;
                }

            } else {
            }
        }, function(err) {
        });
    }
 
    $('#datetimepicker3').datetimepicker({ datepicker: false, format: 'H:i' }); 
    $('#datetimepicker5').datetimepicker({ datepicker: false, format: 'H:i' });

 
    $('#datetimepicker3').on('changeTime', function(ev) {
        $(this).datetimepicker('hide');
    });  
    $('#datetimepicker5').on('changeTime', function(ev) {
        $(this).datetimepicker('hide');
    });
    
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawSalesReportChart);

    function drawSalesReportChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);

        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('salesReportChart'));

        chart.draw(data, options);
    }

    $('.select1').select2();
    $("#hour").val(moment().format('HH')).trigger('change.select2');
    $("#min").val(moment().format('mm')).trigger('change.select2');
    $("#calenderHour").val(moment().format('HH')).trigger('change.select2');
    $("#calenderMin").val(moment().format('mm')).trigger('change.select2');
   
}