#include <skinning_pars_vertex>

varying vec2 vUv;

void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>

    #include <project_vertex>

    vUv = uv;
}