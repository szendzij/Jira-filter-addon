
var tab_resoult = [];
var tab = $($('.issuerow'))
tab.each(function(ind, el){ 
    
    var status = $(el).find('.status span').text();
    var itype =  $(el).find('.issuetype a img').attr('alt')
    tab_resoult[ind] = [status, itype];

    console.log(el); 

});

////////////////////////////////////////////////////






var filtering = {
    
    selectedFilters : [],
    tab_resoult : [],
    tab : [],
    init : function(){
        // przygotowuje dane:
        // tab - cala tablica subtascków
        filtering.tab = $($('.issuerow'));
        // przygotowujemy sobie tablice pomocniczą z elementami ktor na każdym tasku będziemy filtrować 
        filtering.tab.each(function(ind, el){ 
            var status = $(el).find('.status span').text();
            var itype =  $(el).find('.issuetype a img').attr('alt')
            filtering.tab_resoult[ind] = [status, itype];
            console.log(el); 
        });
        
        // zbieramy z widoku listę filtrów
        var $filterCheckboxes = $('input[type="checkbox"]');
        // każdy filtr będzie nasłuchiwał zmiany wartości
        $filterCheckboxes.on('change', function() {
            // filtering.selectedFilters zawiera aktualne zaznaczone checkboxy 
            filtering.selectedFilters = {};

            $filterCheckboxes.filter(':checked').each(function() {

                if (!filtering.selectedFilters.hasOwnProperty(this.name)) {
                    filtering.selectedFilters = [];

                }
                // twożymy listę zaznaczonych w tablicy filtering.selectedFilters  ( poprostu update)
                filtering.selectedFilters.push(this.value);
            });
            // wołamy funkcję filtrującą dane (hide /show)
            filtering.filter();
        });
    },
    filter : function() {
        // dla każego elementu z widoku robimy sprawdzenie czy spełnia WSZYSTKIE warunki filtru
        filtering.tab.each(function(ind, el){ 
            // każdy element ze zbioru wyżej przechodzi przez each dla filtru niżej
            var test = true;
            filtering.selectedFilters.each(function(intValue, filterValue){ 
                if(filtering.tab_resoult.indexOf(filterValue)==-1) {
                    test = false;
                }

            });

            switch(test){ 
            case true: 
                $(el).hide();
                break;
            default:
                $(el).show();
                break;
            }
            
        });
    }    

}




filtering.init();

