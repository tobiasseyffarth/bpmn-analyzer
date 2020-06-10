class ProjectModel {
    constructor() {
        this.bpmn = null;
        this.graph = null;
    }

    setBpmn = (bpmn) => {
        this.bpmn = bpmn;
    }

    getBpmn = () => {
        return this.bpmn;
    }

    setGraph = (graph) => {
        this.graph = graph;
    };

    getGraph = () => {
        return this.graph;
    }
}

const Projectmodel = new ProjectModel();

module.exports = Projectmodel;
