cytoscape({
    container: document.getElementById('cy'),
    showOverlay: false,
    style: cytoscape.stylesheet()
        .selector('node')
        .css({
            'content': 'data(name)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888'
        })
        .selector('edge')
        .css({
            'target-arrow-shape': 'triangle'
        })
        .selector(':selected')
        .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
        })
        .selector('.faded')
        .css({
            'opacity': 0.25,
            'text-opacity': 0
        }),

    elements: {
        nodes: [
            { data: { id: 'cs2020', name: 'CS 2020' } },
            { data: { id: 'cs1010', name: 'CS 1010' } },
            { data: { id: 'cs1101s', name: 'CS 1101S' } },
            { data: { id: 'cs1010e', name: 'CS 1010E' } }
        ],
        edges: [
            { data: { source: 'cs2020', target: 'cs1010' } },
            { data: { source: 'cs2020', target: 'cs1101s' } },
            { data: { source: 'cs2020', target: 'cs1010e' } }
        ]
    },

    ready: function(){
        window.cy = this;

        // giddy up...

        cy.elements().unselectify();

        cy.on('tap', 'node', function(e){
            var node = e.cyTarget;
            var neighborhood = node.neighborhood().add(node);

            cy.elements().addClass('faded');
            neighborhood.removeClass('faded');
        });

        cy.on('tap', function(e){
            if( e.cyTarget === cy ){
                cy.elements().removeClass('faded');
            }
        });
    }
});
