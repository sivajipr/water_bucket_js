var seen={};
var queue=[]

function getstate()
       {
         if (queue.length==0)
                {
                   return NaN;}
         var state=queue[0]
         queue=queue.slice(1)
         return state;
        }
function addstate(parentstate,newstate)
      {
         for (element in seen)
                if (element==newstate)
                        return;
        seen[newstate.toString()]=parentstate.toString();
        queue=queue.concat([newstate]);
        }


function getsolution()
        {
         var solution=[];
         state=queue[queue.length-1];
         while (state.length)
              { solution=solution.concat('['+state.toString()+']');
                state=getparent(state);
                }
         solution.reverse();
         return solution;
          }
function getparent(childstate)
        {
         try
             { return seen[childstate.toString()];
                 }
         catch(err)
                { return NaN;
                  }
          }
function test(oldstate,newstate,goal)
        {
         var newa=newstate[0];
         var newb=newstate[1];
         won =(newa==goal || newb==goal);
         addstate(oldstate,newstate)
         return won;
        }
function playgame(amax,bmax,goal)
        {
         addstate('',[0,0])
         while (true)
                {
                 oldstate=getstate();
                 ahas=oldstate[0];
                 bhas=oldstate[1];
                 if (test (oldstate, [amax,bhas],goal))
                          break ;
                 if (test (oldstate, [0   ,bhas],goal))
                   break ;
                 if (test (oldstate, [ahas,bmax],goal))
                         break;
                 if (test (oldstate, [ahas,0   ],goal))
                         break;
                 howmuch =Math.min(ahas, bmax-bhas)
                 if (test (oldstate, [ahas-howmuch,bhas+howmuch],goal))
                         break;
                 howmuch =Math.min(bhas, amax-ahas)
                 if (test (oldstate, [ahas+howmuch,bhas-howmuch],goal))
                         break;

                }
         console.log('solution is');
         console.log(getsolution(),'\n');

        }

console.log(playgame(7,11,5));



