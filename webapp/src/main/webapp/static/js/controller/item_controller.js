'use strict';

App.controller('ItemController', ['$scope', 'Item', function($scope, Item) {
          var self = this;
          self.item= new Item();
          
          self.items=[];
              
          self.fetchAllItems = function(){
        	  self.items = Item.query();
          };
           
          self.createItem = function(){
        	  self.item.$save(function(){
        		  self.fetchAllItems();
        	  });
          };

          self.updateItem = function(){
        	  self.item.$update(function(){
    			  self.fetchAllItems();
    		  });
          };

         self.deleteItem = function(identity){
        	 var item = Item.get({id:identity}, function() {
        		  item.$delete(function(){
        			  console.log('Deleting item with id ', identity);
        			  self.fetchAllItems();
        		  });
        	 });
          };

          self.fetchAllItems();

          self.submit = function() {
              if(self.item.id==null){
                  console.log('Saving New Item', self.item);    
                  self.createItem();
              }else{
    			  console.log('Upddating item with id ', self.item.id);
                  self.updateItem();
                  console.log('Item updated with id ', self.item.id);
              }
              self.reset();
          };
              
          self.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < self.items.length; i++){
                  if(self.items[i].id === id) {
                     self.item = angular.copy(self.items[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.item.id === id) {//If it is the one shown on screen, reset screen
                 self.reset();
              }
              self.deleteItem(id);
          };

          
          self.reset = function(){
              self.item= new Item();
              $scope.myForm.$setPristine(); //reset Form
          };

      }]);
