/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Back (aback)

************************************************************************ */



/**
 * Low-level Range API which is used together with the low-level Selection API
 */
qx.Class.define("qx.bom.Range",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
 
  statics :
  {
    /**
     * Returns the range object of the given node.
     * 
     * @signature function(element)
     * @param element {Element} element node
     * @return {Range} valid range of given selection
     */
    get : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(element)
      {
        // check for the type of the given element
        // for IE the elements input, textarea, button and body 
        // have access to own TextRange objects. Everything else is
        // gathered via the selection object. 
        if (qx.dom.Node.isElement(element))
        {
          switch(element.nodeName.toLowerCase())
          {
            case "input":
              if (element.type == "text")
              {
                return element.createTextRange();
              }
            break;
            
            case "textarea":
            case "body":
            case "button":
              return element.createTextRange();
            break;
          }
        }
        else
        {
          // need to pass the document node to work with multi-documents
          return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(element)).createRange();          
        }        
      },
      
      "gecko|opera" : function(element)
      {
        var doc = qx.dom.Node.getDocument(element);
        
        // get the selection object of the corresponding document
        var sel = qx.bom.Selection.getSelectionObject(doc);
        
        if (sel.rangeCount > 0)
        {
          return sel.getRangeAt(0);
        }
        else
        {
          return doc.createRange();
        }
      },
      
      "default" : function(element)
      {
        
      }
    })
  } 
});