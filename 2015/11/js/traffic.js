function Traffic(dom) {
    this.dom = dom;
    this.state = 'ready';

    this.stateConfig = {
        ready: {
            nextState: 'go',
            color: 'yellow'
        },
        go: {
            nextState: 'warning',
            color: 'green'
        },
        warning: {
            nextState: 'stop',
            color: 'yellow'
        },
        stop: {
            nextState: 'ready',
            color: 'red'
        }
    };

    this.setColor = function(color) {
        this.dom.style.backgroundColor = color;
    }.bind(this);

    this.dom.onclick = function() {
        var currState = this.stateConfig[this.state];
        this.state = currState.nextState;
        this.setColor(currState.color);
    }.bind(this);

}