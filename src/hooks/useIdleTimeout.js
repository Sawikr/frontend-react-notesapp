import {useIdleTimer} from 'react-idle-timer/legacy';
import {useState} from 'react';
import {useNavigate} from 'react-router';

const useIdleTimeout = ({onHandlePrompt, handleStillHere, onHandleAction}) => {
    const [isNotesClick, setIsNotesClick] = useState(false);
    const [stateNotes, setStateNotes] = useState(' ');
    const navigate = useNavigate();

    const onHandleIdle = () => {
        setStateNotes('Idle');
        console.log('User is idle');
        onHandlePrompt();
    }

    const onActive = () => {
        setStateNotes('Active');
        console.log('User is active');
        idleTimer.activate();
    }

    const idleTimer = useIdleTimer({
        onIdle: onHandleIdle,
        onAction: onHandleAction,
        onPrompt: onHandlePrompt,
        onActive: handleStillHere,
        activate: true,
        reset: true,
        getRemainingTime: 0,
        timeout: 1000 * 60,
        promptBeforeIdle: 1000 * 0.5,
        throttle: 0,
        events: [
            'mousemove',
            'keydown',
            'wheel',
            'DOMMouseScroll',
            'mousewheel',
            'mousedown',
            'touchstart',
            'touchmove',
            'MSPointerDown',
            'MSPointerMove',
            'visibilitychange',
            'focus'
        ],
        immediateEvents: [],
        debounce: 0,
        eventsThrottle: 0,
        element: document,
        startOnMount: true,
        startManually: false,
        stopOnIdle: false,
        crossTab: false,
        name: 'idle-timer',
        syncTimers: 0,
        leaderElection: false
    })

    return (
        idleTimer
    );
}

export default useIdleTimeout;