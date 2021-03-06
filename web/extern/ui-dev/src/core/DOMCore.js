/**
 * Copyright (C) 2010 Sergey I. Sharybin
 */

/**
 * Create new DOM element
 */
function createElement (element)
{
  return document.createElement (element);
}

/**
 * Create text node
 */
function createTextNode (text)
{
  return document.createTextNode (text);
}
/**
 * Remove all nodes from node
 */
function removeAllNodes (node)
{
  while (node.childNodes.length)
    {
      var n = node.childNodes[0];
      node.removeChild (n);
    }
}

/**
 * Move all nodes from source to destination
 */
function moveAllNodes (src, dst)
{
  while (src.childNodes.length)
    {
      var node = src.childNodes[0];
      src.removeChild (node);
      dst.appendChild (node);
    }
}

/**
 * Create link with void href
 */
function voidLink(content, opts)
{
  var result = createElement ('A');

  result.href = 'JavaScript:Void(0)';

  var blurCallback = function ()
    {
      window.setTimeout (function (link) { return function () { link.blur (); }; } (this), 1)
    };

  $(result).mousedown (blurCallback);
  $(result).click (blurCallback);

  if (typeof content == 'string')
    {
      result.innerHTML = content;
    }
  else
    {
      result.appendChild (content);
    }

  if (opts)
    {
      result.canFocus = defVal (opts['canFocus'], true);
    }

  return  result;
}

/**
 * Check node is in tree
 */
function nodeInTree(node, tree)
{
  var cur = node;

  while (cur)
    {
      if (cur == tree)
        {
          return true;
        }

      cur = cur.parentNode;
    }

  return false;
}

/**
 * Remove node from DOM tree
 *
 * @param node - node to be removed
 */
function removeNode(node)
{
  if (!node || !node.parentNode)
    {
      return;
    }

  node.parentNode.removeChild (node);
}

/**
 * Append float terminator
 *
 * @param where - where float should be terminated
 */
function floatTerm (where)
{
  var floatTerm = createElement ('DIV');
  floatTerm.className = 'floatTerm';
  where.appendChild (floatTerm);
}

/**
 * Check if node in document's DOM
 *
 * @param node - node to check
 */
function isNodeEmbedded (node)
{
  var oldID = node.id;

  if (isUnknown (document.embedCounter))
    {
      document.embedCounter = 0;
    }

  node.id = '__checkEmbed' + (document.embedCounter++);

  var result = document.getElementById (node.id);

  node.id = oldID;

  return result != null;
}
