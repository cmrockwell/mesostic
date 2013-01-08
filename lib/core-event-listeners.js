var Core = {};

// W3C DOM 2 Events Model
if (document.addEventListener)
{

	Core.addEventListener = function(target, type, listener)
	{
    	target.addEventListener(type, listener, false);
	};
	
	Core.stopPropagation = function(event)
  	{
    	event.stopPropagation();
  	};
  	Core.preventDefault = function(event)
  	{
    	event.preventDefault();
  	};
	Core.removeEventListener = function(target, type, listener)
  	{
    	target.removeEventListener(type, listener, false);
  	};

}

else if (document.attachEvent)
{
  Core.addEventListener = function(target, type, listener)
  {
    // prevent adding the same listener twice, since DOM 2 Events ignores
    // duplicates like this
    if (Core._findListener(target, type, listener) != -1) return;

    // listener2 calls listener as a method of target in one of two ways,
    // depending on what this version of IE supports, and passes it the global
    // event object as an argument
    var listener2 = function()
    {
      var event = window.event;

      if (Function.prototype.call)
      {
        listener.call(target, event);
      }
      else
      {
        target._currentListener = listener;
        target._currentListener(event)
        target._currentListener = null;
      }
    };

    // add listener2 using IE's attachEvent method
    target.attachEvent("on" + type, listener2);
    
    //The above code allows us to create an event listener for IE
    //and be able to use the "this" keyword.  The code below stores 
    //our object references so the can be cleaned up later.  This 
    //stops any memory leak issues.
    

    // create an object describing this listener so we can clean it up later
    var listenerRecord =
    {
      target: target,
      type: type,
      listener: listener,
      listener2: listener2
    };

    // get a reference to the window object containing target
    var targetDocument = target.document || target;
    var targetWindow = targetDocument.parentWindow;

    // create a unique ID for this listener
    var listenerId = "l" + Core._listenerCounter++;

    // store a record of this listener in the window object
    if (!targetWindow._allListeners) targetWindow._allListeners = {};
    targetWindow._allListeners[listenerId] = listenerRecord;

    // store this listener's ID in target
    if (!target._listeners) target._listeners = [];
    target._listeners[target._listeners.length] = listenerId;

    // set up Core._removeAllListeners to clean up all listeners on unload
    if (!targetWindow._unloadListenerAdded)
    {
      targetWindow._unloadListenerAdded = true;
      targetWindow.attachEvent("onunload", Core._removeAllListeners);
    }
  };
  
Core.stopPropagation = function(event)
  {
    event.cancelBubble = true;
  };
  
Core.preventDefault = function(event)
  {
    event.returnValue = false;
  };
  
Core.removeEventListener = function(target, type, listener)
  {
    // find out if the listener was actually added to target
    var listenerIndex = Core._findListener(target, type, listener);
    if (listenerIndex == -1) return;

    // get a reference to the window object containing target
    var targetDocument = target.document || target;
    var targetWindow = targetDocument.parentWindow;

   	// obtain the record of the listener from the window object
    var listenerId = target._listeners[listenerIndex];
    var listenerRecord = targetWindow._allListeners[listenerId];

    // remove the listener, and remove its ID from target
    target.detachEvent("on" + type, listenerRecord.listener2);
    target._listeners.splice(listenerIndex, 1);

    //remove the record of the listener from the window object
    delete targetWindow._allListeners[listenerId];
  };
    

Core._findListener = function(target, type, listener)
  {
    // get the array of listener IDs added to target
    var listeners = target._listeners;
    if (!listeners) return -1;

    // get a reference to the window object containing target
    var targetDocument = target.document || target;
    var targetWindow = targetDocument.parentWindow;

    // searching backward (to speed up onunload processing), find the listener
    var len = listeners.length;
    for (var i = len - 1; i >= 0; i--)
    {
      // get the listener's ID from target
      var listenerId = listeners[i];

      // get the record of the listener from the window object
      var listenerRecord = targetWindow._allListeners[listenerId];

      // compare type and listener with the retrieved record
      if (listenerRecord.type == type && listenerRecord.listener == listener)
      {
        return i;
      }
    }
    return -1;
  };

  Core._removeAllListeners = function()
  {
    var targetWindow = this;
	//this is a for loop going though an associative array
    for (id in targetWindow._allListeners)
    {
      var listenerRecord = targetWindow._allListeners[id];
      listenerRecord.target.detachEvent("on" + listenerRecord.type, listenerRecord.listener2);
      delete targetWindow._allListeners[id];
    }
  };

  Core._listenerCounter = 0;
}//else if (document.attachEvent)

