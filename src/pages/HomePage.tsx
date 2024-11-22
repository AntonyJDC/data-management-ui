import { PlusCircle, Search, RefreshCw, Trash2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IoMdPerson } from "react-icons/io";
import { ScrollArea } from '../components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface CRUDCardProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const CRUDCard: React.FC<CRUDCardProps> = ({ href, icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={href}
      className="block text-foreground no-underline transition-transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative min-h-[200px] p-6 bg-base-200 rounded-lg shadow-md border-2 border-base-300 hover:border-primary transition-colors">
        <div className="flex flex-col h-full">
          <Icon className="w-8 h-8 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-base-content">{description}</p>
        </div>
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </Link>
  )
}

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Data Management</title>
      </Helmet>
      <ScrollArea className="w-full" type="auto">
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-7xl">
            <div className="mb-12 sm:mt-12">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold flex tracking-tight">
                <IoMdPerson className='mr-4' /> Welcome to data management!
              </h1>
              <p className="mt-4 text-md sm:text-lg text-base-content/70">
                Easily manage your database with a simple and intuitive interface. Navigate through the options to create, view, update, or delete user information seamlessly. This platform ensures efficient data handling for all your management needs.
              </p>
              <p className="mt-8 sm:mt-16 text-md sm:text-lg text-base-content/70">
                Select an operation to perform on the database records below or use the navigation bar to access other sections.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
              <CRUDCard
                href="/create"
                icon={PlusCircle}
                title="Create"
                description="Add new users to the database"
              />
              <CRUDCard
                href="/read"
                icon={Search}
                title="Read"
                description="View information from existing users"
              />
              <CRUDCard
                href="/update"
                icon={RefreshCw}
                title="Update"
                description="Modify existing user information"
              />
              <CRUDCard
                href="/delete"
                icon={Trash2}
                title="Delete"
                description="Delete users from the database"
              />
            </div>
          </div>
        </div>
      </ScrollArea >
    </>

  )
}