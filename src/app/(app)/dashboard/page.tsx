import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { api } from '~/trpc/server';

const Page = async () => {
  const user = await api.user.getById({});

  return (
    <div className='p-4'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-lg text-grey-text'>Hey,</p>
          <h1 className='text-2xl font-bold'>{user.name?.split(' ')[0]}</h1>
        </div>
        <Avatar className='size-[60px] border'>
          <AvatarImage alt={`${user.name} avatar`} src={user.image ?? ''} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Page;
