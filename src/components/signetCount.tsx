import { useBuilderStore } from '~/zustand/builderProvider';
import { Button } from './ui/button';
import { Label } from './ui/label';

const SignetCount = () => {
    const planner = useBuilderStore(store => store);
    return (
        <div className='flex w-full items-center justify-between gap-2'>
            <div className='flex gap-2'>
                <Button
                    size={'sm'}
                    onClick={() => planner.decreaseSignetCount(25)}
                >
                    -25
                </Button>
                <Button
                    size={'sm'}
                    onClick={() => planner.decreaseSignetCount(1)}
                >
                    -
                </Button>
            </div>
            <Label>Total Signets: {planner.characterData.totalSignets}</Label>
            <div className='flex gap-2'>
                <Button
                    size={'sm'}
                    onClick={() => planner.increaseSignetCount(1)}
                >
                    +
                </Button>
                <Button
                    size={'sm'}
                    onClick={() => planner.increaseSignetCount(25)}
                >
                    +25
                </Button>
            </div>
        </div>
    );
};

export default SignetCount;
