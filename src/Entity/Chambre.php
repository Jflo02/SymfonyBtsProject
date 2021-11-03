<?php

namespace App\Entity;

use App\Repository\ChambreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChambreRepository::class)
 */
class Chambre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Lit::class, mappedBy="chambre")
     */
    private $lit;

    public function __construct()
    {
        $this->lit = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Lit[]
     */
    public function getLit(): Collection
    {
        return $this->lit;
    }

    public function addLit(Lit $lit): self
    {
        if (!$this->lit->contains($lit)) {
            $this->lit[] = $lit;
            $lit->setChambre($this);
        }

        return $this;
    }

    public function removeLit(Lit $lit): self
    {
        if ($this->lit->removeElement($lit)) {
            // set the owning side to null (unless already changed)
            if ($lit->getChambre() === $this) {
                $lit->setChambre(null);
            }
        }

        return $this;
    }
}
