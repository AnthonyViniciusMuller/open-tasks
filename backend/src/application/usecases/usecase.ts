export interface Usecase<In, Out> {
    execute(input: In): Promise<Out>;
}