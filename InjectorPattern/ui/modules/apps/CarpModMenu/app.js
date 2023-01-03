angular.module('beamng.apps')
.directive('beamRegenerator', [function () {
  return {
    template:
    '<div style="max-height:100%; width:100%;" layout="column" layout-align="center" layout-wrap class="bngApp">' +
      '<md-text flex style="margin: 2px; color:blue; text-align: center; min-width: 122px" md-no-ink class="md-raised" ">Carp and Beammp Mod Menu (Beta)</md-text>' +
      '<md-button flex style="margin: 2px; min-width: 122px" md-no-ink class="md-raised" ng-click="unspoof()">Send Vehicle Data to Server (Unspoofer)</md-button>' +
      '<md-button flex style="margin: 2px; min-width: 122px" md-no-ink class="md-raised" ng-click="toggle()">Disable or Enable Vehicle Spoofer</md-button>' +
      '<md-button flex style="margin: 2px; min-width: 122px" md-no-ink class="md-raised" ng-click="sendlicenseplate()">Send License Plate to Server</md-button>' +
    '</div>',
    replace: true,
    restrict: 'EA',
    scope: true,
    link: function (scope, element, attrs) {
        scope.progress = 100;
        scope.status = "";
        scope.dest = "no location set yet";
        scope.AutoUnspoof = false

  scope.licensePlate = ''

  let getLicensePlate = function () {
    bngApi.engineLua('core_vehicles.getVehicleLicenseText(be:getPlayerVehicle(0))', function (str) {
      scope.licensePlate = str;
    })
  }

  getLicensePlate()

  scope.sendlicenseplate = function () {
    getLicensePlate()
    console.log("sended license plate information to server")
    bngApi.engineLua('ui_message("Seneded license plate text:  '+ scope.licensePlate +'"' +')')
    bngApi.engineLua('core_vehicles.setPlateText('+ scope.licensePlate +')')
  }

        scope.$on('VehicleChange', (event, data) => {
        if (scope.AutoUnspoof) {
          console.log("Automatic unspoofed")
          scope.unspoof()
      }});
      
        scope.toggle = function () {
        if (scope.AutoUnspoof) {
          scope.AutoUnspoof = false
          bngApi.engineLua('ui_message("Vehicle Spoofer has been enabled")')
          console.log(scope.AutoUnspoof)
            } else {
          scope.AutoUnspoof = true
          bngApi.engineLua('ui_message("Vehicle Spoofer has been disabled")')
          console.log(scope.AutoUnspoof)
        }};
      

        scope.unspoof = function () {
            bngApi.engineLua('ui_message("Sended current vehicle to the server")')
            bngApi.engineLua("MPVehicleGE.sendVehicleEditReal(be:getPlayerVehicle(0):getID())");
            console.log("Sended a event to the remote handler.")
        }
    }
  }
}]);