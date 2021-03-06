import { ConflictListener } from './ConflictListener'
import { ConflictResolution } from './ConflictResolution'
import { ConflictResolutionStrategy } from './ConflictResolutionStrategy'
import { ObjectStateData } from './ObjectStateData'
import { GraphQLResolveInfo } from 'graphql'

/**
 * Interface for handling changing state of the object.
 * Implementors can extend this interface to provide reliable way to
 * determine if object is in conflict and calculate next state
 * (version/hash etc.) that object should have after modification.
 */
export interface ObjectState {

  /**
   *
   * @param serverState the data currently on the server
   * @param clientState the data the client wishes to perform some mutation with
   * @param obj object that's coming from Apollo
   * @param args arguments that are coming from Apollo
   * @param context context that's coming from Apollo
   * @param info resolver info that's coming from Apollo
   */
  hasConflict(serverState: ObjectStateData, clientState: ObjectStateData, obj: any, args: any, context: any, info: GraphQLResolveInfo): boolean

  /**
   *
   * @param objectState the object wish you would like to progress to its next state
   */
  nextState(objectState: ObjectStateData): ObjectStateData

  /**
   *
   * @param serverState the current state of the object on the server
   * @param clientState the state of the object the client wishes to perform some mutation with
   */
  resolveOnClient(serverState: ObjectStateData, clientState: ObjectStateData): ConflictResolution

  /**
   *
   * @param strategy the conflict resolution strategy
   * @param serverState the current state of the object on the server
   * @param clientState the state of the object the client wishes to perform some mutation with
   */
  resolveOnServer (strategy: ConflictResolutionStrategy, serverState: ObjectStateData, clientState: ObjectStateData): Promise<ConflictResolution>

  /**
   * Set a listener for conflict resolution
   * @param listener - listener implementation
   */
  setConflictListener(listener: ConflictListener): void
}
