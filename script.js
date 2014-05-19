$(document).ready(function() {

    /*
     * Image Slider
    */
    $('#slides').slidesjs({
        navigation: {
            effect: "fade"
        },
        pagination: {
            active: false
        },
        play: {
            active: false,
            auto: true,
            interval: 7000,
            swap: true,
            effect: "fade"
        }
    });

    /*
     * @name Menu
     * @description The goal of this section to get the menu information from the JSON.
     *              Go to http://mksrestaurantapi.herokuapp.com/menu-dinner.json to see an example of what the JSON looks like.
     * @steps
     *      1. Get the event information from a click handler.
     *      2. Use that event info to get the JSON from the API.
     *      3. Iterate through the array in 2 steps:
     *          1. Iterate through the array of sections and create the HTML string per section
     *          2. Within each section, iterate through each piece of menu info and create the HTML string.
     *      4. Take the finalized HTML string and populate the menu section of the site.
    */

        /*
         * @name populateMenu
         * @description Populate individual items of the menu
        */
        
        var populateMenu = function(json) {

            // @TODO Create empty string variable
            var item = "";
            // @TODO Iterate through array that was passed through the parameter 
            for(var x=0; x<json.length; x++) {
                //check to make sure 'ingredients' exists bc it does not for Wine
               if(json[x].ingredients) {
                    item = item + '<div class="menu-item"><div class="menu-item-name">' + json[x].dish + '</div>';
                    item = item + '<p class="menu-item-description">' + json[x].ingredients + '</p>';
                    item = item + '<div class="menu-item-price">' + json[x].price + '</div></div>';
                }  else {
                    item = item + '<div class="menu-item"><div class="menu-item-name">' + json[x].dish + '</div>';
                    item = item + '<div class="menu-item-price">' + json[x].price + '</div></div>';
                }    
            }    

            console.log(item);
                /*
                 * @TODO Create HTML string based on the original HTML. Final sting should look like this:
                 *       <div class="menu-item">
                 *            <div class="menu-item-name">malpeque oyster</div>
                 *            <p class="menu-item-description">prince edward island, canada</p>
                 *            <div class="menu-item-price">3</div>
                 *       </div>
                */

                /*
                 * @TODO Extension: Notice how on wine, there are undefined ingredients
                 *            Goal: Check if the ingredient section exists. 
                 *                   If it doesn't, remove the ingredients section and 
                 *                   add a new CSS class to the menu item name to make the price 
                 *                   show up next to it.
                */


            // @TODO Return the created string
            return item;

        };



        /*
         * @name populateSections
         * @description Populate sections of the menu and add that to the HTML.
        */

        var populateSections = function(json) {

            // @TODO Create empty string variable
            var sections = "";
            /*
             * @TODO Create HTML string based on the original HTML. 
             *       YOU WILL NEED TO PASS populateMenu() into this loop in order to get the string for the individual pieces.
             *  
             *  Final sting should look like this:
             *  <div id="menu-section-content" class="menu-section-content menu-dinner is-active">
             *        <div class="menu-group columns small-12 medium-4">
             *            <h4>Raw Bar</h4>
             *               ...
             *        </div>
             *         ...
             *  </div>
            */

            // @TODO Iterate through array that was passed through the parameter and create the HTML string
            for(var x=0; x < json.length; x++) {
                sections = sections + '<div class="menu-group columns small-12 medium-4"><h4>' + json[x].section + '</h4>';
                sections = sections + populateMenu(json[x].content);
                sections = sections + '</div>'
                console.log("inside", sections);
            }

            console.log("sections", sections);

            // @TODO Use a jQuery function to insert the HTML string into the menu section content area
            $('.menu-section-content').html(sections);

        };

        /*
         * @name getMenu
         * @description Get menu items from the API.
         * @param course - this parameter is used to get the specific course section, ie 'breakfast', 'lunch', 'wine'
        */

        var getMenu = function(course) {

            /*
             * @TODO Extension: Replace $.getJSON() with $.ajax(). If done properly, you will have made your first AJAX command!
            *                   Google 'jQuery json' to learn more about how to use it.
            */

            // Get the JSON from the API.
            $.getJSON('http://mksrestaurantapi.herokuapp.com/menu-' + course +'.json' , function(json) {
                
                console.log(json);
                // Once that happens, run populateSections() and pass in the JSON.
                populateSections(json);

            });

        };

        /*
         * @name Event Handler
         * @description This event handler will pick up event information from the menu actions. Use this to pass the course to getMenu.
        */

        // @TODO Create an event handler to get event information for menu actions
        $('.menu-action').on('click', function() {
            // @TODO Get the id attribute from what was clicked.
            var $this = $(this);
            var id = $this.attr('id');
            // @TODO Console.log id. Notice how the end of the ID has 'breakfast','lunch', etc. 
            // This action will save the ending of the id to back into id, so now id only equals 'breakfast','lunch',etc
            id = id.substring(12,id.length);

            console.log(id);
    

            // @TODO Pass the id into getMenu() to begin the process of getting the JSON and populating the data
            getMenu(id);
            // @TODO Remove the class 'is-active' from all menu actions
            $('.menu-action').removeClass('is-active');
            // @TODO Add 'is-active' to this specific action that was clicked. 'is-active provides the visual cue for what's active via CSS
            $this.addClass('is-active'); 
        });
    /*
     * @name init
     * @description This function will run when site loads to get dinner information first.
    */

    var init = function() {
        getMenu('dinner');
        $(".menu-action").removeClass('is-active');
        $("#menu-action-dinner").addClass('is-active');
    };

    // Run init() to make whatever happens in init run.
    init();

}); 